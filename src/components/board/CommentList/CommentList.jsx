import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Badge } from 'react-bootstrap';
import CommentForm from '../CommentForm';
import styles from './CommentList.module.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [sortBy, setSortBy] = useState('latest'); // latest, oldest, popular

  // 댓글 데이터 로드
  useEffect(() => {
    loadComments();
  }, [postId, sortBy]);

  const loadComments = async () => {
    setLoading(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockComments = [
        {
          id: 1,
          content: '정말 좋은 분석이네요! 특히 기관 투자 증가 부분이 인상깊습니다. 앞으로도 이런 분석글 많이 올려주세요.',
          author: {
            nickname: '투자고수',
            level: 'Platinum',
            profileImage: '/assets/images/profile1.png'
          },
          createdAt: '2025-09-04 16:45',
          likes: 12,
          isLiked: false,
          replies: [
            {
              id: 11,
              content: '저도 동감합니다. 라이트닝 네트워크 부분도 흥미로웠어요.',
              author: {
                nickname: '크립토러버',
                level: 'Gold',
                profileImage: '/assets/images/profile2.png'
              },
              createdAt: '2025-09-04 17:20',
              likes: 3,
              isLiked: true,
              parentId: 1
            },
            {
              id: 12,
              content: '감사합니다! 다음에는 이더리움 분석도 올려보겠습니다.',
              author: {
                nickname: '크립토분석가',
                level: 'Gold',
                profileImage: '/assets/images/profile3.png'
              },
              createdAt: '2025-09-04 17:25',
              likes: 5,
              isLiked: false,
              parentId: 1
            }
          ]
        },
        {
          id: 2,
          content: '좋은 정보 감사합니다. 하지만 $50,000 저항선 돌파가 쉽지 않을 것 같아요. 어떻게 생각하시나요?',
          author: {
            nickname: '신중한투자자',
            level: 'Silver',
            profileImage: '/assets/images/profile4.png'
          },
          createdAt: '2025-09-04 16:30',
          likes: 8,
          isLiked: false,
          replies: []
        },
        {
          id: 3,
          content: '규제 리스크가 가장 걱정되네요. 특히 미국 쪽 규제 변화가 큰 영향을 줄 것 같습니다.',
          author: {
            nickname: '리스크관리자',
            level: 'Bronze',
            profileImage: '/assets/images/profile5.png'
          },
          createdAt: '2025-09-04 16:15',
          likes: 4,
          isLiked: false,
          replies: []
        }
      ];
      
      setComments(mockComments);
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    if (newComment.parentId) {
      // 답글인 경우
      setComments(prev => prev.map(comment => 
        comment.id === newComment.parentId 
          ? { ...comment, replies: [...comment.replies, newComment] }
          : comment
      ));
    } else {
      // 새 댓글인 경우
      setComments(prev => [newComment, ...prev]);
    }
    setReplyingTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(prev => prev.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === commentId
                  ? { 
                      ...reply, 
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleReport = (commentId) => {
    if (window.confirm('이 댓글을 신고하시겠습니까?')) {
      alert('신고가 접수되었습니다.');
    }
  };

  const handleDelete = (commentId, isReply = false, parentId = null) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      if (isReply) {
        setComments(prev => prev.map(comment => 
          comment.id === parentId 
            ? { ...comment, replies: comment.replies.filter(reply => reply.id !== commentId) }
            : comment
        ));
      } else {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
    }
  };

  const getLevelBadge = (level) => {
    const colors = {
      Bronze: 'secondary',
      Silver: 'info',
      Gold: 'warning',
      Platinum: 'primary'
    };
    return <Badge bg={colors[level] || 'secondary'} className="ms-2">{level}</Badge>;
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}일 전`;
    
    return date.toLocaleDateString();
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular':
        return b.likes - a.likes;
      case 'latest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const renderComment = (comment, isReply = false) => (
    <div 
      key={comment.id} 
      className={`${styles.comment} ${isReply ? styles.reply : ''}`}
    >
      <div className={styles.commentHeader}>
        <div className={styles.authorInfo}>
          <img 
            src={comment.author.profileImage}
            alt={comment.author.nickname}
            className={styles.authorImage}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40x40/5E94CA/ffffff?text=U';
            }}
          />
          <div className={styles.authorDetails}>
            <div className={styles.authorName}>
              {comment.author.nickname}
              {getLevelBadge(comment.author.level)}
            </div>
            <div className={styles.commentTime}>
              {formatTimeAgo(comment.createdAt)}
            </div>
          </div>
        </div>
        
        <Dropdown>
          <Dropdown.Toggle variant="link" size="sm" className={styles.commentMenu}>
            <i className="fas fa-ellipsis-v"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleReport(comment.id)}>
              <i className="fas fa-flag me-2"></i>신고
            </Dropdown.Item>
            <Dropdown.Item 
              onClick={() => handleDelete(comment.id, isReply, comment.parentId)}
              className="text-danger"
            >
              <i className="fas fa-trash me-2"></i>삭제
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
      <div className={styles.commentContent}>
        {comment.content}
      </div>
      
      <div className={styles.commentActions}>
        <Button
          variant="link"
          size="sm"
          className={`${styles.actionButton} ${comment.isLiked ? styles.liked : ''}`}
          onClick={() => handleLike(comment.id, isReply, comment.parentId)}
        >
          <i className={`fas fa-heart ${comment.isLiked ? '' : 'far'}`}></i>
          {comment.likes > 0 && <span className="ms-1">{comment.likes}</span>}
        </Button>
        
        {!isReply && (
          <Button
            variant="link"
            size="sm"
            className={styles.actionButton}
            onClick={() => handleReply(comment.id)}
          >
            <i className="fas fa-reply"></i>
            답글
          </Button>
        )}
      </div>
      
      {!isReply && comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
      
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
  );

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">댓글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.commentList}>
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      
      {comments.length > 0 && (
        <>
          <div className={styles.sortControls}>
            <div className={styles.commentCount}>
              총 {comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)}개의 댓글
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" size="sm">
                <i className="fas fa-sort me-2"></i>
                {sortBy === 'latest' ? '최신순' : sortBy === 'oldest' ? '오래된순' : '인기순'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={() => setSortBy('latest')}
                  active={sortBy === 'latest'}
                >
                  최신순
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => setSortBy('oldest')}
                  active={sortBy === 'oldest'}
                >
                  오래된순
                </Dropdown.Item>
                <Dropdown.Item 
                  onClick={() => setSortBy('popular')}
                  active={sortBy === 'popular'}
                >
                  인기순
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          
          <div className={styles.comments}>
            {sortedComments.map(comment => renderComment(comment))}
          </div>
        </>
      )}
      
      {comments.length === 0 && (
        <div className={styles.noComments}>
          <i className="fas fa-comments fa-3x text-muted mb-3"></i>
          <p>아직 댓글이 없습니다.</p>
          <p className="text-muted">첫 번째 댓글을 작성해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default CommentList;
