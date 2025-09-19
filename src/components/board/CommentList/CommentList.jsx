import React, { useState, useEffect, useMemo } from "react"
import { Button, Dropdown, Badge, Alert } from "react-bootstrap"
import CommentForm from "../CommentForm"
import styles from "../../../styles/components/board/CommentList.module.css"
import { useDispatch, useSelector } from "react-redux"
import {
  getCommentByIdThunk,
  deleteCommentThunk,
  likeCommentThunk,
} from "../../../features/commentSlice"
import { reportCommentThunk } from "../../../features/reportSlice"
import { getMeThunk } from "../../../features/userSlice"

const CommentList = ({ postId }) => {
  const [sortBy] = useState("latest")
  const [replyingTo, setReplyingTo] = useState(null)

  const dispatch = useDispatch()
  const {
    comments: rawComments,
    loading,
    error,
  } = useSelector((state) => state.comment)
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (!user) {
      dispatch(getMeThunk()).catch(() => {})
    }
  }, [dispatch])
  // 댓글 데이터 로드
  useEffect(() => {
    if (postId && typeof postId === "number") {
      dispatch(getCommentByIdThunk(postId))
    }
    return () => clearInterval()
  }, [dispatch, postId])

  // 댓글 목록 포맷팅 및 정렬
  const formattedAndSortedComments = useMemo(() => {
    if (!rawComments || !Array.isArray(rawComments)) {
      return []
    }

    const formatted = rawComments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      author: {
        id: comment.user_id,
        nickname: comment.User?.name || `사용자${comment.user_id}`,
        level: "Bronze",
        profileImage: comment.User?.profile_img,
      },
      createdAt: comment.createdAt,
      like_count: comment.like_count || 0,
      isLiked: false,
      reports: comment.report_count || 0,
      replies: [], // 대댓글 형태만
    }))

    return formatted.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "popular":
          return b.likes - a.likes
        case "latest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
  }, [rawComments, sortBy])

  const handleCommentAdded = () => {
    setReplyingTo(null)
  }

  const renderComment = (comment) => (
    <div key={comment.id} className={`${styles.comment}`}>
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <img
            src={
              comment.author.profileImage
                ? // https로 시작하는지 확인 외부 경로이므로(구글 프로필) 그대로 사용
                  comment.author.profileImage.startsWith("http")
                  ? // 아닐시 내부 경로이므로 API_URL 붙여서 사용
                    comment.author.profileImage
                  : `${import.meta.env.VITE_API_URL}${
                      comment.author.profileImage
                    }`
                : "/vite.svg"
            }
            alt={comment.author.nickname}
            className={styles.authorImage}
            onError={(e) => {
              e.target.src = "/vite.svg"
            }}
          />
          <span className={styles.authorName}>
            {comment.author.nickname}
            <Badge bg='secondary' className='ms-2'>
              {comment.author.level}
            </Badge>
          </span>
        </div>
        <div className={styles.commentMeta}>
          <span className={styles.date}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={styles.commentBody}>
        <p className={styles.commentText}>{comment.content}</p>
      </div>

      <div className={styles.commentActions}>
        <div className={styles.actionButtons}>
          {user && (
            <Button
              variant='link'
              className={styles.menuButton}
              onClick={() => {
                const reason = prompt("신고 사유를 입력해주세요:")
                if (reason && reason.trim()) {
                  dispatch(
                    reportCommentThunk({
                      commentId: comment.id,
                      userId: user.id,
                      reason: reason.trim(),
                    })
                  )
                  alert("신고가 접수되었습니다. 검토 후 처리하겠습니다.")
                }
              }}
            >
              <i className='fas fa-flag me-1'></i>신고
            </Button>
          )}

          {user && user.id === comment.author.id ? (
            <Button
              variant='link'
              className={`${styles.menuButton} text-danger`}
              onClick={() => {
                if (!postId || typeof postId !== "number") {
                  alert("올바른 게시글 정보가 없습니다.")
                  return
                }
                if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
                  console.log(
                    "Deleting comment with boardId:",
                    postId,
                    "commentId:",
                    comment.id
                  )
                  dispatch(
                    deleteCommentThunk({
                      boardId: postId,
                      commentId: comment.id,
                    })
                  )
                }
              }}
            >
              <i className='fas fa-trash me-1'></i>삭제
            </Button>
          ) : (
            ""
          )}
        </div>

        <div className={styles.stats}>
          <span className={styles.likes}>
            {user ? (
              <Button
                variant='link'
                className={styles.likeButton}
                onClick={async () => {
                  await dispatch(
                    likeCommentThunk({
                      commentId: comment.id,
                      userId: user.id,
                    })
                  )
                }}
              >
                <i className='fas fa-heart me-1'></i>
                {comment.like_count}
              </Button>
            ) : (
              <div className={styles.likeButton}>
                <i className='fas fa-heart me-1'></i>
                {comment.like_count}
              </div>
            )}
          </span>
          {comment.reports > 0 && (
            <span className={styles.reports}>
              <i className='fas fa-flag me-1'></i>
              {comment.reports}
            </span>
          )}
        </div>
      </div>

      {replyingTo === comment.id && (
        <div className={styles.replyForm}>
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCommentAdded={handleCommentAdded}
            onCancel={() => setReplyingTo(null)}
          />
        </div>
      )}
    </div>
  )

  if (loading && formattedAndSortedComments.length === 0) {
    return <div>로딩 중....</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  // 유효하지 않은 postId인 경우 렌더링하지 않음
  if (!postId || typeof postId !== "number") {
    return null
  }

  return (
    <div className={styles.commentList}>
      <div className={styles.commentForm}>
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        <hr className='my-4' />
      </div>

      {formattedAndSortedComments.length > 0 ? (
        <>
          <div className={styles.comments}>
            {formattedAndSortedComments.map((comment) =>
              renderComment(comment)
            )}
          </div>
        </>
      ) : (
        !loading && (
          <div className={styles.noComments}>
            <Alert variant='light' className='text-center'>
              아직 작성된 댓글이 없습니다.
              <br />첫 댓글을 작성해보세요!
            </Alert>
          </div>
        )
      )}
    </div>
  )
}

export default CommentList
