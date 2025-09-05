import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './PostList.module.css'

const PostList = ({ category = 'all' }) => {
   const [posts, setPosts] = useState([])
   const [loading, setLoading] = useState(true)
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)
   const postsPerPage = 10
   const navigate = useNavigate()

   useEffect(() => {
      loadPosts()
   }, [category, currentPage])

   const loadPosts = async () => {
      setLoading(true)

      try {
         // API 호출 시뮬레이션
         await new Promise((resolve) => setTimeout(resolve, 800))

         const mockPosts = [
            {
               id: 1,
               title: '비트코인 50,000달러 돌파 가능성 분석 - 기관 투자 증가와 규제 개선 신호',
               author: {
                  nickname: '크립토분석가',
                  level: 'Gold',
                  profileImage: '/assets/images/profile1.png',
               },
               category: '분석',
               createdAt: '2025-09-04 15:30',
               views: 1243,
               likes: 89,
               comments: 23,
               isPinned: true,
            },
            {
               id: 2,
               title: '이더리움 2.0 업그레이드 완료 후 가격 전망',
               author: {
                  nickname: 'ETH마니아',
                  level: 'Platinum',
                  profileImage: '/assets/images/profile2.png',
               },
               category: '분석',
               createdAt: '2025-09-04 14:15',
               views: 987,
               likes: 67,
               comments: 18,
            },
            {
               id: 3,
               title: '알트코인 시즌 시작? 주목해야 할 코인 5선',
               author: {
                  nickname: '알트코인헌터',
                  level: 'Silver',
                  profileImage: '/assets/images/profile3.png',
               },
               category: '추천',
               createdAt: '2025-09-04 13:45',
               views: 756,
               likes: 45,
               comments: 12,
            },
            {
               id: 4,
               title: 'DeFi 프로토콜 수익률 비교 및 리스크 분석',
               author: {
                  nickname: 'DeFi전문가',
                  level: 'Gold',
                  profileImage: '/assets/images/profile4.png',
               },
               category: 'DeFi',
               createdAt: '2025-09-04 12:20',
               views: 612,
               likes: 38,
               comments: 9,
            },
            {
               id: 5,
               title: 'NFT 시장 현황과 향후 전망 - 게임 NFT가 답일까?',
               author: {
                  nickname: 'NFT콜렉터',
                  level: 'Bronze',
                  profileImage: '/assets/images/profile5.png',
               },
               category: 'NFT',
               createdAt: '2025-09-04 11:30',
               views: 445,
               likes: 28,
               comments: 7,
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
      navigate(`/board/${postId}`)
   }

   const handleWritePost = () => {
      navigate('/board/write')
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

   const getCategoryBadge = (category) => {
      const colors = {
         분석: 'primary',
         추천: 'success',
         DeFi: 'warning',
         NFT: 'info',
         질문: 'secondary',
         자유: 'light',
      }
      return <Badge bg={colors[category] || 'secondary'}>{category}</Badge>
   }

   const getLevelBadge = (level) => {
      const colors = {
         Bronze: 'secondary',
         Silver: 'info',
         Gold: 'warning',
         Platinum: 'primary',
      }
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
         <div className={styles.header}>
            <div className={styles.headerLeft}>
               <h4>커뮤니티 게시판</h4>
               <p className="text-muted">암호화폐 관련 정보와 의견을 나누는 공간입니다</p>
            </div>
            <Button variant="primary" onClick={handleWritePost} className={styles.writeButton}>
               <i className="fas fa-pen me-2"></i>
               글쓰기
            </Button>
         </div>

         <div className={styles.posts}>
            {posts.map((post) => (
               <ul key={post.id} className={`${styles.postCard} ${post.isPinned ? styles.pinned : ''}`} onClick={() => handlePostClick(post.id)}>
                  <li>
                     <div className={styles.postHeader}>
                        {' '}
                        <div className={styles.postMeta}>
                           {post.isPinned && (
                              <Badge bg="danger" className="me-2">
                                 <i className="fas fa-thumbtack me-1"></i>공지
                              </Badge>
                           )}
                           <p>{post.author.nickname}</p>
                           <p>{getLevelBadge(post.author.level)}</p>
                        </div>
                        <div className={styles.postTime}>{formatTimeAgo(post.createdAt)}</div>
                     </div>

                     <div className={styles.boardTitle}>
                        <h5 className={styles.postTitle}>{post.title}</h5>
                        <p className={styles.stat}>{`[${post.comments}]`}</p>
                     </div>

                     <div className={styles.postFooter}>
                        <div className={styles.postStats}>
                           <span className={styles.stat}>
                              <i className="fas fa-eye me-1"></i>
                              {post.views.toLocaleString()}
                           </span>
                           <span className={styles.stat}>
                              <i className="fas fa-heart me-1"></i>
                              {post.likes}
                           </span>
                        </div>
                     </div>
                  </li>
               </ul>
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
      </div>
   )
}

export default PostList
