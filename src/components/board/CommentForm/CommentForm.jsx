import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from '../../../styles/components/board/CommentForm.module.css';

const CommentForm = ({ postId, parentId = null, onCommentAdded, onCancel }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 로그인 상태 (실제로는 Redux나 Context에서 가져올 예정)
  const isLoggedIn = true;
  const currentUser = {
    nickname: 'TestUser',
    profileImage: '/assets/images/profile-default.png'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }

    if (content.length < 2) {
      setError('댓글은 최소 2자 이상 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newComment = {
        id: Date.now(),
        content: content.trim(),
        author: currentUser,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
        parentId
      };

      // 부모 컴포넌트에 새 댓글 전달
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }

      setContent('');
      
    } catch (error) {
      setError('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginRequired}>
        <p>댓글을 작성하려면 로그인이 필요합니다.</p>
        <Button variant="primary" size="sm">
          로그인
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.commentForm}>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <img 
            src={currentUser.profileImage}
            alt={currentUser.nickname}
            className={styles.userImage}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/32x32/5E94CA/ffffff?text=U';
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
            placeholder={parentId ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
            disabled={isLoading}
            maxLength={1000}
            className={styles.commentTextarea}
          />
          <Form.Text className="text-muted">
            {content.length}/1000
          </Form.Text>
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
                disabled={isLoading}
                className="me-2"
              >
                취소
              </Button>
            )}
            <Button 
              variant="primary" 
              size="sm" 
              type="submit"
              disabled={isLoading || !content.trim()}
            >
              {isLoading ? (
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
  );
};

export default CommentForm;
