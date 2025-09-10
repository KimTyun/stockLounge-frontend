import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, Pagination, Collapse } from 'react-bootstrap'
import styles from '../../../styles/components/board/PostList.module.css'
import PostEditor from '../PostEditor/PostEditor'
import PostDetail from '../PostDetail/PostDetail'

const PostList = ({ category = 'all' }) => {
   const [posts, setPosts] = useState([])
   const [loading, setLoading] = useState(true)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)
   const postsPerPage = 10
   const [write, setWrite] = useState(false)

   const [selectedPostId, setSelectedPostId] = useState(null)

   useEffect(() => {
      setSelectedPostId(null)
      loadPosts()
   }, [category, currentPage])

   const loadPosts = async () => {
      setLoading(true)
      try {
         await new Promise((resolve) => setTimeout(resolve, 800))
         const mockPosts = [
            {
               id: 1,
               title: '비트코인 50,000달러 돌파 가능성 분석 - 기관 투자 증가와 규제 개선 신호',
               author: { nickname: '크립토분석가', level: 'Gold', profileImage: '/assets/images/profile1.png' },
               category: '분석',
               createdAt: '2025-09-04 15:30',
               views: 1243,
               likes: 89,
               comments: 23,
               isPinned: true,
               content: '최근 비트코인이 강세를 보이고 있는 가운데, 여러 기관투자자들의 진입과 규제 환경 개선으로 50,000달러 돌파 가능성이 높아지고 있습니다.',
            },
            {
               id: 2,
               title: '이더리움 2.0 업그레이드 완료 후 가격 전망',
               author: { nickname: 'ETH마니아', level: 'Platinum', profileImage: '/assets/images/profile2.png' },
               category: '분석',
               createdAt: '2025-09-04 14:15',
               views: 987,
               likes: 67,
               comments: 18,
               content: '이더리움 2.0 업그레이드가 성공적으로 완료되면서 스테이킹 수익률과 네트워크 효율성이 크게 개선될 것으로 예상됩니다.',
            },
            {
               id: 3,
               title: '알트코인 시즌 시작? 주목해야 할 코인 5선',
               author: { nickname: '알트코인헌터', level: 'Silver', profileImage: '/assets/images/profile3.png' },
               category: '추천',
               createdAt: '2025-09-04 13:45',
               views: 756,
               likes: 45,
               comments: 12,
               content: '비트코인 도미넌스가 하락하면서 알트코인 시즌이 시작될 조짐을 보이고 있습니다. 특히 주목해야 할 5개 코인을 분석해보겠습니다.',
            },
            {
               id: 4,
               title: 'DeFi 프로토콜 수익률 비교 및 리스크 분석',
               author: { nickname: 'DeFi전문가', level: 'Gold', profileImage: '/assets/images/profile4.png' },
               category: 'DeFi',
               createdAt: '2025-09-04 12:20',
               views: 612,
               likes: 38,
               comments: 9,
               content: '주요 DeFi 프로토콜들의 수익률을 비교분석하고, 각각의 리스크 요소들을 체크해보겠습니다.',
            },
            {
               id: 5,
               title: 'NFT 시장 현황과 향후 전망 - 게임 NFT가 답일까?',
               author: { nickname: 'NFT콜렉터', level: 'Bronze', profileImage: '/assets/images/profile5.png' },
               category: 'NFT',
               createdAt: '2025-09-04 11:30',
               views: 445,
               likes: 28,
               comments: 7,
               content: 'NFT 시장이 침체기를 겪고 있는 가운데, 게임 NFT가 새로운 돌파구가 될 수 있을지 분석해보겠습니다.',
            },
         ]
         setPosts(mockPosts)
         setTotalPages(Math.ceil(mockPosts.length / postsPerPage))
      } catch (error) {
         console.error('게시글 로드 실패:', error)
      } finally {
         setLoading(false)
      }
   }

   const handlePostClick = (postId) => {
      setSelectedPostId(postId)
   }

   const handleBackToList = () => {
      setSelectedPostId(null)
   }

   const handleWritePost = () => {
      setWrite(!write)
   }

   const formatTimeAgo = (dateString) => {
      const now = new Date()
      const date = new Date(dateString)
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      if (diffInMinutes < 1) return '방금 전'
      if (diffInMinutes < 60) return `${diffInMinutes}분 전`
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) return `${diffInHours}시간 전`
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 7) return `${diffInDays}일 전`
      return date.toLocaleDateString()
   }

   const getLevelBadge = (level) => {
      const colors = { Bronze: 'secondary', Silver: 'info', Gold: 'warning', Platinum: 'primary' }
      return (
         <Badge bg={colors[level] || 'secondary'} className="ms-2">
            {level}
         </Badge>
      )
   }

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
      )
   }

   return (
      <div className={styles.postList}>
         {selectedPostId ? (
            <PostDetail postId={selectedPostId} onBackToList={handleBackToList} />
         ) : (
            <>
               <div className={styles.header}>
                  <div className={styles.headerLeft}>
                     <h4>커뮤니티 게시판</h4>
                     <p className="text-muted">암호화폐 관련 정보와 의견을 나누는 공간입니다</p>
                  </div>
                  <div>
                     <Button variant="primary" onClick={handleWritePost} className={`${styles.writeButton} ms-auto d-flex`}>
                        <i className={`fas fa-${write ? 'times' : 'pen'} me-2`}></i>
                        {write ? '닫기' : '글쓰기'}
                     </Button>
                  </div>
               </div>

               <Collapse in={write}>
                  <div className="mb-4">
                     <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                           <h5 className="mb-0">새 게시글 작성</h5>
                           <Button variant="outline-secondary" size="sm" onClick={() => setWrite(false)}>
                              <i className="fas fa-times"></i>
                           </Button>
                        </Card.Header>
                        <Card.Body>
                           <PostEditor />
                        </Card.Body>
                     </Card>
                  </div>
               </Collapse>

               {/* 1000px 이상일때 */}
               <div className={`${styles.posts} ${styles.tableView}`}>
                  <ul className={styles.postTable}>
                     <li className={styles.listHead}>
                        <div className={styles.titleColumn}>제목</div>
                        <div className={styles.authorColumn}>작성자</div>
                        <div className={styles.viewsColumn}>조회수</div>
                        <div className={styles.likesColumn}>추천수</div>
                        <div className={styles.dateColumn}>등록일</div>
                     </li>
                     {posts.map((post) => (
                        <li key={post.id} className={`${styles.postRow} ${post.isPinned ? styles.pinned : ''}`} onClick={() => handlePostClick(post.id)}>
                           <div className={styles.titleColumn}>
                              {post.isPinned && (
                                 <Badge bg="danger" className="me-2">
                                    <i className="fas fa-thumbtack me-1"></i>공지
                                 </Badge>
                              )}
                              <span className={styles.postTitle}>{post.title}</span>
                              {post.comments > 0 && <span className={styles.commentCount}>[{post.comments}]</span>}
                           </div>
                           <div className={styles.authorColumn}>
                              <span className={styles.authorName}>{post.author.nickname}</span>
                              {getLevelBadge(post.author.level)}
                           </div>
                           <div className={styles.viewsColumn}>
                              <i className="fas fa-eye me-1"></i>
                              {post.views.toLocaleString()}
                           </div>
                           <div className={styles.likesColumn}>
                              <i className="fas fa-heart me-1"></i>
                              {post.likes}
                           </div>
                           <div className={styles.dateColumn}>{formatTimeAgo(post.createdAt)}</div>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* 1000px 이하일때 */}
               <div className={`${styles.posts} ${styles.cardView}`}>
                  {posts.map((post) => (
                     <Card key={post.id} className={`${styles.postCard} ${post.isPinned ? styles.pinned : ''}`} onClick={() => handlePostClick(post.id)}>
                        <Card.Body>
                           <div className={styles.postHeader}>
                              {post.isPinned && (
                                 <Badge bg="danger">
                                    <i className="fas fa-thumbtack me-1"></i>공지
                                 </Badge>
                              )}
                              <div className="postMeta ms-auto">
                                 <div className={styles.postTime}>{formatTimeAgo(post.createdAt)}</div>
                              </div>
                           </div>

                           <h5 className={styles.postTitle}>{post.title}</h5>

                           {post.content && <p className={styles.postContent}>{post.content}</p>}

                           <div className={styles.postFooter}>
                              <div className={styles.authorInfo}>
                                 <img
                                    src={post.author.profileImage}
                                    alt={post.author.nickname}
                                    className={styles.authorImage}
                                    onError={(e) => {
                                       e.target.src = '/assets/images/default-profile.png'
                                    }}
                                 />
                                 <div className={styles.authorName}>
                                    {post.author.nickname}
                                    {getLevelBadge(post.author.level)}
                                 </div>
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
                        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                           <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                              {index + 1}
                           </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                     </Pagination>
                  </div>
               )}
            </>
         )}
      </div>
   )
}

export default PostList
