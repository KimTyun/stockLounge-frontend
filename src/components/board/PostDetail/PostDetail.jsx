import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import styles from './PostDetail.module.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // 임시 게시글 데이터 (실제로는 API에서 가져올 예정)
  useEffect(() => {
    // API 호출 시뮬레이션
    setTimeout(() => {
      const mockPost = {
        id: parseInt(id),
        title: '비트코인 급등, 이번엔 진짜일까? 전문가 분석',
        content: `
          <p>안녕하세요, 크립토 분석가입니다.</p>
          
          <p>최근 비트코인이 다시 한번 급등세를 보이고 있습니다. 이번 상승의 배경과 지속 가능성에 대해 분석해보겠습니다.</p>
          
          <h3>📈 현재 상황</h3>
          <p>비트코인은 지난 주 대비 15% 상승하며 $45,000을 돌파했습니다. 이는 여러 긍정적 요인들이 복합적으로 작용한 결과로 보입니다.</p>
          
          <h3>🔍 상승 요인 분석</h3>
          <ul>
            <li><strong>기관 투자 증가:</strong> 대형 자산운용사들의 비트코인 ETF 매수세 증가</li>
            <li><strong>규제 명확화:</strong> 주요국의 암호화폐 규제 프레임워크 정비</li>
            <li><strong>기술적 개선:</strong> 라이트닝 네트워크 확산으로 실용성 증대</li>
            <li><strong>거시경제 요인:</strong> 인플레이션 헷지 자산으로서의 재평가</li>
          </ul>
          
          <h3>⚠️ 주의사항</h3>
          <p>하지만 과도한 낙관은 금물입니다. 다음과 같은 리스크 요인들도 고려해야 합니다:</p>
          <ul>
            <li>높은 변동성은 여전히 존재</li>
            <li>규제 리스크 상존</li>
            <li>기술적 저항선 $50,000 돌파 여부</li>
          </ul>
          
          <h3>💡 결론</h3>
          <p>단기적으로는 긍정적이지만, 장기 투자 관점에서 신중한 접근이 필요합니다. 분할 매수를 통한 리스크 분산을 권장합니다.</p>
          
          <p><em>※ 본 글은 투자 참고용이며, 투자 책임은 본인에게 있습니다.</em></p>
        `,
        author: {
          nickname: '크립토분석가',
          level: 'Gold',
          profileImage: '/assets/images/profile-default.png'
        },
        category: 'bitcoin',
        tags: ['비트코인', 'BTC', '분석', '투자'],
        createdAt: '2025-09-04 15:30',
        updatedAt: '2025-09-04 15:35',
        views: 1247,
        likes: 156,
        comments: 23,
        isNotice: false,
        isPinned: false
      };
      
      setPost(mockPost);
      setLikeCount(mockPost.likes);
      setViewCount(mockPost.views);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleEdit = () => {
    navigate(`/board/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      // API 호출
      navigate('/board');
    }
  };

  const handleReport = () => {
    if (window.confirm('이 게시글을 신고하시겠습니까?')) {
      alert('신고가 접수되었습니다. 검토 후 처리하겠습니다.');
    }
  };

  const getCategoryBadge = (category) => {
    const categoryMap = {
      bitcoin: { label: '비트코인', color: 'warning' },
      ethereum: { label: '이더리움', color: 'info' },
      ripple: { label: '리플', color: 'primary' },
      general: { label: '일반', color: 'secondary' },
      nft: { label: 'NFT', color: 'success' }
    };
    
    const cat = categoryMap[category] || categoryMap.general;
    return <Badge bg={cat.color}>{cat.label}</Badge>;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Container>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">게시글을 불러오는 중...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.notFound}>
        <Container>
          <div className="text-center py-5">
            <h2>게시글을 찾을 수 없습니다</h2>
            <p>삭제되었거나 존재하지 않는 게시글입니다.</p>
            <Button variant="primary" onClick={() => navigate('/board')}>
              게시판으로 돌아가기
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.postDetail}>
      <Container>
        <Row>
          <Col lg={8} className="mx-auto">
            {/* 게시글 헤더 */}
            <Card className={styles.postCard}>
              <Card.Body>
                <div className={styles.postHeader}>
                  <div className={styles.postMeta}>
                    {getCategoryBadge(post.category)}
                    {post.isNotice && <Badge bg="danger" className="ms-2">공지</Badge>}
                    {post.isPinned && <Badge bg="info" className="ms-2">고정</Badge>}
                  </div>
                  
                  <h1 className={styles.postTitle}>{post.title}</h1>
                  
                  <div className={styles.authorInfo}>
                    <div className={styles.authorProfile}>
                      <img 
                        src={post.author.profileImage} 
                        alt={post.author.nickname}
                        className={styles.authorImage}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40x40/5E94CA/ffffff?text=U';
                        }}
                      />
                      <div className={styles.authorDetails}>
                        <div className={styles.authorName}>
                          {post.author.nickname}
                          <Badge bg="secondary" className="ms-2">{post.author.level}</Badge>
                        </div>
                        <div className={styles.postDate}>
                          작성일: {post.createdAt}
                          {post.updatedAt !== post.createdAt && (
                            <span className="text-muted ms-2">(수정됨: {post.updatedAt})</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.postActions}>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                          <i className="fas fa-ellipsis-v"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleEdit}>
                            <i className="fas fa-edit me-2"></i>수정
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete} className="text-danger">
                            <i className="fas fa-trash me-2"></i>삭제
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleReport}>
                            <i className="fas fa-flag me-2"></i>신고
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  
                  <div className={styles.postStats}>
                    <span><i className="fas fa-eye me-1"></i>조회 {viewCount.toLocaleString()}</span>
                    <span><i className="fas fa-heart me-1"></i>추천 {likeCount}</span>
                    <span><i className="fas fa-comment me-1"></i>댓글 {post.comments}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* 게시글 본문 */}
            <Card className={styles.contentCard}>
              <Card.Body>
                <div 
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* 태그 */}
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTags}>
                    {post.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className={styles.tag}>
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* 액션 버튼들 */}
            <Card className={styles.actionCard}>
              <Card.Body>
                <div className={styles.actionButtons}>
                  <Button 
                    variant={isLiked ? "primary" : "outline-primary"}
                    onClick={handleLike}
                    className={styles.likeButton}
                  >
                    <i className={`fas fa-heart ${isLiked ? '' : 'far'}`}></i>
                    추천 {likeCount}
                  </Button>
                  
                  <Button variant="outline-secondary">
                    <i className="fas fa-share"></i>
                    공유
                  </Button>
                  
                  <Button variant="outline-secondary">
                    <i className="fas fa-bookmark"></i>
                    북마크
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* 댓글 섹션 */}
            <Card className={styles.commentSection}>
              <Card.Header>
                <h5><i className="fas fa-comments me-2"></i>댓글 {post.comments}개</h5>
              </Card.Header>
              <Card.Body>
                <CommentForm postId={post.id} />
                <CommentList postId={post.id} />
              </Card.Body>
            </Card>

            {/* 네비게이션 버튼 */}
            <div className={styles.postNavigation}>
              <Button variant="secondary" onClick={() => navigate('/board')}>
                <i className="fas fa-list me-2"></i>목록으로
              </Button>
              <Button variant="primary" onClick={() => navigate('/board/write')}>
                <i className="fas fa-pen me-2"></i>글쓰기
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostDetail;
