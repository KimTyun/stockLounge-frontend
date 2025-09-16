import React, { useState, useEffect, useMemo } from "react";
import { Button, Dropdown, Badge, Alert } from "react-bootstrap";
import CommentForm from "../CommentForm";
import styles from "../../../styles/components/board/CommentList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentByIdThunk,
  deleteCommentThunk,
} from "../../../features/commentSlice";

const CommentList = ({ postId }) => {
  // 정렬 옵션 상태
  const [sortBy] = useState("latest"); // setSortBy는 사용하지 않으므로 제거
  const [replyingTo, setReplyingTo] = useState(null);

  const dispatch = useDispatch();
  const {
    comments: rawComments,
    loading,
    error,
  } = useSelector((state) => state.comment);

  // 댓글 데이터 로드
  useEffect(() => {
    console.log("CommentList - current postId:", postId); // postId 값 확인
    if (postId && typeof postId === "number") {
      dispatch(getCommentByIdThunk(postId));
    }
    return () => clearInterval();
  }, [dispatch, postId]);

  // 댓글 목록 포맷팅 및 정렬
  const formattedAndSortedComments = useMemo(() => {
    if (!rawComments || !Array.isArray(rawComments)) {
      return [];
    }

    const formatted = rawComments.map((c) => ({
      id: c.id,
      content: c.content,
      author: {
        id: c.user_id,
        nickname: c.user_id ? `사용자${c.user_id}` : "익명",
        level: "Bronze",
        profileImage: "/vite.svg",
      },
      createdAt: c.createdAt,
      likes: c.like_count || 0,
      isLiked: false,
      reports: c.report_count || 0,
      replies: [], // 대댓글 형태만
    }));

    return formatted.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "popular":
          return b.likes - a.likes;
        case "latest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [rawComments, sortBy]);

  const handleCommentAdded = () => {
    setReplyingTo(null);
  };

  const renderComment = (comment, isReply = false) => (
    <div
      key={comment.id}
      className={`${styles.comment} ${isReply ? styles.reply : ""}`}
    >
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <img
            src={comment.author.profileImage}
            alt={comment.author.nickname}
            className={styles.authorImage}
            onError={(e) => {
              e.target.src = "/vite.svg";
            }}
          />
          <span className={styles.authorName}>
            {comment.author.nickname}
            <Badge bg="secondary" className="ms-2">
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
          <Button
            variant="link"
            className={styles.actionButton}
            onClick={() => setReplyingTo(comment.id)}
          >
            <i className="fas fa-reply me-1"></i>답글
          </Button>
          <Dropdown className={styles.commentMenu}>
            <Dropdown.Toggle variant="link" className={styles.menuButton}>
              <i className="fas fa-ellipsis-v"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  if (!postId || typeof postId !== "number") {
                    alert("올바른 게시글 정보가 없습니다.");
                    return;
                  }
                  if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
                    console.log(
                      "Deleting comment with boardId:",
                      postId,
                      "commentId:",
                      comment.id
                    );
                    dispatch(
                      deleteCommentThunk({
                        boardId: postId,
                        commentId: comment.id,
                      })
                    );
                  }
                }}
              >
                <i className="fas fa-trash me-2"></i>삭제
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fas fa-flag me-2"></i>신고
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.stats}>
          <span className={styles.likes}>
            <i className="fas fa-heart me-1"></i>
            {comment.likes}
          </span>
          {comment.reports > 0 && (
            <span className={styles.reports}>
              <i className="fas fa-flag me-1"></i>
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

      {!isReply && comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  if (loading && formattedAndSortedComments.length === 0) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // 유효하지 않은 postId인 경우 렌더링하지 않음
  if (!postId || typeof postId !== "number") {
    return null;
  }

  return (
    <div className={styles.commentList}>
      <div className={styles.commentForm}>
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        <hr className="my-4" />
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
            <Alert variant="light" className="text-center">
              아직 작성된 댓글이 없습니다.
              <br />첫 댓글을 작성해보세요!
            </Alert>
          </div>
        )
      )}
    </div>
  );
};

export default CommentList;
