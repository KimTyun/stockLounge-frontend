import React, { useState, useEffect, useMemo } from 'react'
import { Button, Dropdown, Badge, Alert } from 'react-bootstrap'
import CommentForm from '../CommentForm'
import styles from '../../../styles/components/board/CommentList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentByIdThunk } from '../../../features/commentSlice'

const CommentList = ({ postId }) => {
   const [replyingTo, setReplyingTo] = useState(null)
   const [sortBy, setSortBy] = useState('latest')

   const dispatch = useDispatch()
   const { comments: rawComments, loading, error } = useSelector((state) => state.comment)

   // 댓글 데이터 로드
   useEffect(() => {
      if (postId) {
         dispatch(getCommentByIdThunk(postId))
      }
   }, [dispatch, postId])

   const formattedAndSortedComments = useMemo(() => {
      if (!rawComments || !Array.isArray(rawComments)) {
         return []
      }

      const formatted = rawComments.map((c) => ({
         id: c.id,
         content: c.content,
         author: {
            id: c.user_id,
            nickname: c.user_id ? `사용자${c.user_id}` : '익명',
            level: 'Bronze',
            profileImage: '/vite.svg',
         },
         createdAt: c.createdAt,
         likes: c.like_count || 0,
         isLiked: false,
         reports: c.report_count || 0,
         replies: [], // 대댓글 형태만
      }))

      return formatted.sort((a, b) => {
         switch (sortBy) {
            case 'oldest':
               return new Date(a.createdAt) - new Date(b.createdAt)
            case 'popular':
               return b.likes - a.likes
            case 'latest':
            default:
               return new Date(b.createdAt) - new Date(a.createdAt)
         }
      })
   }, [rawComments, sortBy])

   const handleCommentAdded = () => {
      setReplyingTo(null)
   }

   const renderComment = (comment, isReply = false) => (
      <div key={comment.id} className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
         {!isReply && comment.replies && comment.replies.length > 0 && <div className={styles.replies}>{comment.replies.map((reply) => renderComment(reply, true))}</div>}

         {replyingTo === comment.id && (
            <div className={styles.replyForm}>
               <CommentForm postId={postId} parentId={comment.id} onCommentAdded={handleCommentAdded} onCancel={() => setReplyingTo(null)} />
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

   return (
      <div className={styles.commentList}>
         <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

         {formattedAndSortedComments.length > 0 ? (
            <>
               <div className={styles.sortControls}></div>

               <div className={styles.comments}>{formattedAndSortedComments.map((comment) => renderComment(comment))}</div>
            </>
         ) : (
            !loading && <div className={styles.noComments}></div>
         )}
      </div>
   )
}

export default CommentList
