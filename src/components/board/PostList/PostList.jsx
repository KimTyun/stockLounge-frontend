import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/components/board/PostList.module.css';

const PostList = ({ category = 'all' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, [category, currentPage]);

  const loadPosts = async () => {
    setLoading(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockPosts = [
        {
          id: 1,
          title: '비트코인 50,000달러 돌파 가능성 분석 - 기관 투자 증가와 규제 개선 신호',
          content: '최근 비트코인이 강력한 상승세를 보이고 있습니다. 특히 기관 투자자들의 관심이 증가하고 있으며...',
          author: {
            nickname: '크립토분석가',
            level: 'Gold',
            profileImage: '/assets/images/profile1.png'
          },
          category: '분석',
          tags: ['비트코인', 'BTC', '기관투자', '시장분석'],
          createdAt: '2025-09-04 15:30',
          views: 1243,
          likes: 89,
          comments: 23,
          isHot: true,
          isPinned: false
        },
        {
          id: 2,
          title: '이더리움 2.0 업그레이드 완료 후 가격 전망',
          content: '이더리움 2.0의 모든 업그레이드가 완료되면서 네트워크 성능이 크게 향상되었습니다...',
          author: {
            nickname: 'ETH마니아',
            level: 'Platinum',
            profileImage: '/assets/images/profile2.png'
          },
          category: '분석',
          tags: ['이더리움', 'ETH', 'ETH2.0', '업그레이드'],
          createdAt: '2025-09-04 14:15',
          views: 987,
          likes: 67,
          comments: 18,
          isHot: true,
          isPinned: true
        },
        {
          id: 3,
          title: '알트코인 시즌 시작? 주목해야 할 코인 5선',
          content: '비트코인 도미넌스가 하락하면서 알트코인들이 강세를 보이고 있습니다. 특히 주목해야 할...',
          author: {
            nickname: '알트코인헌터',
            level: 'Silver',
            profileImage: '/assets/images/profile3.png'
          },
          category: '추천',
          tags: ['알트코인', '투자추천', '시장분석'],
          createdAt: '2025-09-04 13:45',
          views: 756,
          likes: 45,
          comments: 12,
          isHot: false,
          isPinned: false
        },
        {
          id: 4,
          title: 'DeFi 프로토콜 수익률 비교 및 리스크 분석',
          content: '현재 주요 DeFi 프로토콜들의 수익률을 비교해보고, 각각의 리스크 요인들을 분석해보겠습니다...',
          author: {
            nickname: 'DeFi전문가',
            level: 'Gold',
            profileImage: '/assets/images/profile4.png'
          },
          category: 'DeFi',
          tags: ['DeFi', '수익률', '리스크분석', '프로토콜'],
          createdAt: '2025-09-04 12:20',
          views: 612,
          likes: 38,
          comments: 9,
          isHot: false,
          isPinned: false
        },
        {
          id: 5,
          title: 'NFT 시장 현황과 향후 전망 - 게임 NFT가 답일까?',
          content: 'NFT 시장이 침체기를 겪고 있지만, 게임 분야에서는 새로운 활용 사례들이 등장하고 있습니다...',
          author: {
            nickname: 'NFT콜렉터',
            level: 'Bronze',
            profileImage: '/assets/images/profile5.png'
          },
          category: 'NFT',
          tags: ['NFT', '게임', '시장전망', '트렌드'],
          createdAt: '2025-09-04 11:30',
          views: 445,
          likes: 28,
          comments: 7,
          isHot: false,
          isPinned: false
        }
      ];
      
      setPosts(mockPosts);
      setTotalPages(Math.ceil(mockPosts.length / postsPerPage));
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/board/${postId}`);
  };

  const handleWritePost = () => {
    navigate('/board/write');
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

  const getCategoryBadge = (category) => {
    const colors = {
      '분석': 'primary',
      '추천': 'success',
      'DeFi': 'warning',
      'NFT': 'info',
      '질문': 'secondary',
      '자유': 'light'
    };
    return <Badge bg={colors[category] || 'secondary'}>{category}</Badge>;
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

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postList}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4>커뮤니티 게시판</h4>
          <p className="text-muted">암호화폐 관련 정보와 의견을 나누는 공간입니다</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleWritePost}
          className={styles.writeButton}
        >
          <i className="fas fa-pen me-2"></i>
          글쓰기
        </Button>
      </div>

      <div className={styles.posts}>
        {posts.map(post => (
          <Card 
            key={post.id} 
            className={`${styles.postCard} ${post.isPinned ? styles.pinned : ''}`}
            onClick={() => handlePostClick(post.id)}
          >
            <Card.Body>
              <div className={styles.postHeader}>
                <div className={styles.postMeta}>
                  {post.isPinned && (
                    <Badge bg="danger" className="me-2">
                      <i className="fas fa-thumbtack me-1"></i>공지
                    </Badge>
                  )}
                  {post.isHot && (
                    <Badge bg="warning" className="me-2">
                      <i className="fas fa-fire me-1"></i>HOT
                    </Badge>
                  )}
                  {getCategoryBadge(post.category)}
                </div>
                <div className={styles.postTime}>
                  {formatTimeAgo(post.createdAt)}
                </div>
              </div>

              <h5 className={styles.postTitle}>
                {post.title}
              </h5>

              <p className={styles.postContent}>
                {post.content}
              </p>

              <div className={styles.postTags}>
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className={styles.postFooter}>
                <div className={styles.authorInfo}>
                  <img 
                    src={post.author.profileImage}
                    alt={post.author.nickname}
                    className={styles.authorImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/32x32/5E94CA/ffffff?text=U';
                    }}
                  />
                  <span className={styles.authorName}>
                    {post.author.nickname}
                    {getLevelBadge(post.author.level)}
                  </span>
                </div>

                <div className={styles.postStats}>
                  <span className={styles.stat}>
                    <i className="fas fa-eye me-1"></i>
                    {post.views.toLocaleString()}
                  </span>
                  <span className={styles.stat}>
                    <i className="fas fa-heart me-1"></i>
                    {post.likes}
                  </span>
                  <span className={styles.stat}>
                    <i className="fas fa-comment me-1"></i>
                    {post.comments}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination>
            <Pagination.First 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            
            <Pagination.Next 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PostList;
