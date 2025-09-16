import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import styles from '../../../styles/components/board/CommentForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createCommentThunk } from '../../../features/commentSlice'

const CommentForm = ({ postId, parentId = null, onCommentAdded, onCancel }) => {
   const [content, setContent] = useState('')
   const [submitError, setSubmitError] = useState('')

   const dispatch = useDispatch()
   const { loading, error, comment } = useSelector((state) => state.comment)
   const { id } = useParams()

   // 로그인 상태 (실제로는 Redux나 Context에서 가져올 예정)
   const isLoggedIn = true
   const currentUser = {
      id: 1,
      nickname: 'TestUser',
      profileImage: '/vite.svg',
   }

   // 댓글 작성 성공 시 처리
   useEffect(() => {
      if (comment && !loading && !error) {
         if (onCommentAdded) {
            onCommentAdded(comment)
         }
         setContent('')
         setSubmitError('')
      }
   }, [comment, loading, error, onCommentAdded])

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!content.trim()) {
         setSubmitError('댓글 내용을 입력해주세요.')
         return
      }

      if (content.length < 2) {
         setSubmitError('댓글은 2자 이상 입력해주세요.')
         return
      }

      setSubmitError('')

      try {
         const commentData = {
            user_id: currentUser.id,
            board_id: postId || id,
            content: content.trim(),
            parent_id: parentId, // 답글인 경우 부모 댓글 ID
         }

         await dispatch(createCommentThunk(commentData)).unwrap()
      } catch (error) {
         setSubmitError(error.message || '댓글 작성 중 오류가 발생했습니다.')
      }
   }

   if (!isLoggedIn) {
      return (
         <div className={styles.loginRequired}>
            <p>댓글을 작성하려면 로그인이 필요합니다.</p>
            <Button variant="primary" size="sm">
               로그인
            </Button>
         </div>
      )
   }

   return (
      <div className={styles.commentForm}>
         {(error || submitError) && (
            <Alert variant="danger" className="mb-3">
               {submitError || error}
            </Alert>
         )}

         <Form onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
               <img
                  src={currentUser.profileImage}
                  alt={currentUser.nickname}
                  className={styles.userImage}
                  onError={(e) => {
                     e.target.src = 'https://via.placeholder.com/32x32/5E94CA/ffffff?text=U'
                  }}
               />
               <span className={styles.userName}>{currentUser.nickname}</span>
            </div>

            <Form.Group className="mb-3">
               <Form.Control
                  as="textarea"
                  rows={parentId ? 3 : 4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={parentId ? '답글을 입력하세요...' : '댓글을 입력하세요...'}
                  disabled={loading}
                  maxLength={1000}
                  className={styles.commentTextarea}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                     }
                  }}
               />
               <Form.Text className="text-muted">{content.length}/1000</Form.Text>
            </Form.Group>

            <div className={styles.formActions}>
               <div className={styles.actionHints}>
                  <small className="text-muted">
                     <i className="fas fa-info-circle me-1"></i>
                     Shift + Enter로 줄바꿈, Enter로 댓글 작성
                  </small>
               </div>

               <div className={styles.buttons}>
                  {parentId && onCancel && (
                     <Button variant="outline-secondary" size="sm" onClick={onCancel} disabled={loading} className="me-2">
                        취소
                     </Button>
                  )}
                  <Button variant="primary" size="sm" type="submit" disabled={loading || !content.trim()}>
                     {loading ? (
                        <>
                           <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                           작성 중...
                        </>
                     ) : (
                        <>
                           <i className="fas fa-paper-plane me-2"></i>
                           {parentId ? '답글 작성' : '댓글 작성'}
                        </>
                     )}
                  </Button>
               </div>
            </div>
         </Form>
      </div>
   )
}

export default CommentForm
