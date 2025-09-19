import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import styles from '../../../styles/components/board/CommentForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  createCommentThunk,
  getCommentByIdThunk,
} from '../../../features/commentSlice'
import { getMeThunk } from '../../../features/userSlice'

const CommentForm = ({ postId, parentId = null, onCommentAdded, onCancel }) => {
  const [content, setContent] = useState('')
  const [submitError, setSubmitError] = useState('')

  const dispatch = useDispatch()
  const { loading, error, comment } = useSelector((state) => state.comment)
  const { user } = useSelector((state) => state.user)
  const { id } = useParams()

  useEffect(() => {
    if (!user) {
      dispatch(getMeThunk())
    }
  }, [dispatch, user])

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

    if (!user) {
      setSubmitError('로그인이 필요합니다.')
      return
    }

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
        user_id: user.id,
        board_id: postId || id,
        content: content.trim(),
        parent_id: parentId,
      }

      await dispatch(createCommentThunk(commentData)).unwrap()

      // 댓글 작성 성공 후 댓글 목록 새로고침
      dispatch(getCommentByIdThunk(postId || id))
    } catch (error) {
      setSubmitError(error.message || '댓글 작성 중 오류가 발생했습니다.')
    }
  }

  if (!user) {
    return (
      <div className={styles.commentForm}>
        <div className="text-center py-3">
          로그인 하셔야 댓글 등록을 할 수 있습니다.
        </div>
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
            src={
              user.profile_img
                ? user.profile_img.startsWith('http')
                  ? user.profile_img
                  : `${import.meta.env.VITE_API_URL}${user.profile_img}`
                : '/vite.svg'
            }
            alt={user.name || `사용자${user.id}`}
            className={styles.userImage}
            onError={(e) => {
              e.target.src = '/vite.svg'
            }}
          />
          <span className={styles.userName}>
            {user.name || `사용자${user.id}`}
          </span>
        </div>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={parentId ? 3 : 4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              parentId ? '답글을 입력하세요...' : '댓글을 입력하세요...'
            }
            disabled={loading}
            maxLength={1000}
            className={styles.commentTextarea}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                // 엔터키 눌러도 줄바꿈 반응 안되게 Shift + Enter로 줄바꿈
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
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onCancel}
                disabled={loading}
                className="me-2"
              >
                취소
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={loading || !content.trim()}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
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
