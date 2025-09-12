import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, Pagination, Collapse } from 'react-bootstrap'
import styles from '../../../styles/components/board/PostList.module.css'
import PostEditor from '../PostEditor/PostEditor'
import PostDetail from '../PostDetail/PostDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardThunk } from '../../../features/boardSlice'

const PostList = ({ category = 'free' }) => {
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(1)
   const [write, setWrite] = useState(false)

   const [selectedPostId, setSelectedPostId] = useState(null)

   const dispatch = useDispatch()
   const { boards, error, loading } = useSelector((state) => state.board)

   useEffect(() => {
      if (!selectedPostId) {
         dispatch(getBoardThunk())
      }
   }, [dispatch, selectedPostId])

   const handlePostClick = (id) => {
      setSelectedPostId(id)
   }

   const handleBackToList = () => {
      setSelectedPostId(null)
      dispatch(getBoardThunk())
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
      return <div>로딩 중...</div>
   }
   if (error) {
      return <div>{error}</div>
   }

   return (
      <div className={styles.postList}>
         {selectedPostId ? (
            <PostDetail boardId={selectedPostId} onBackToList={handleBackToList} />
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
                     {boards && boards.length > 0
                        ? boards.map((board) => (
                             <li key={board.id} className={`${styles.postRow} ${board.isPinned ? styles.pinned : ''}`} onClick={() => handlePostClick(board.id)}>
                                <div className={styles.titleColumn}>
                                   {board.isPinned && (
                                      <Badge bg="danger" className="me-2">
                                         <i className="fas fa-thumbtack me-1"></i>공지
                                      </Badge>
                                   )}
                                   <span className={styles.postTitle}>{board.title}</span>
                                   {(board.comment_count || 0) > 0 && <span className={styles.commentCount}>[{board.comment_count}]</span>}
                                </div>
                                <div className={styles.authorColumn}>
                                   <span className={styles.authorName}>{board.user_id ? `사용자${board.user_id}` : '익명'}</span>
                                   {/* author 정보가 없으므로 기본 레벨 표시 */}
                                   {getLevelBadge('Bronze')}
                                </div>
                                <div className={styles.viewsColumn}>
                                   <i className="fas fa-eye me-1"></i>
                                   {(board.view_count || 0).toLocaleString()}
                                </div>
                                <div className={styles.likesColumn}>
                                   <i className="fas fa-heart me-1"></i>
                                   {board.like_count || 0}
                                </div>
                                <div className={styles.dateColumn}>{formatTimeAgo(board.createdAt)}</div>
                             </li>
                          ))
                        : ''}
                  </ul>
               </div>

               {/* 1000px 이하일때 */}
               <div className={`${styles.posts} ${styles.cardView}`}>
                  {boards.map((board) => (
                     <Card key={board.id} className={`${styles.postCard} ${board.isPinned ? styles.pinned : ''}`} onClick={() => handlePostClick(board.id)}>
                        <Card.Body>
                           <div className={styles.postHeader}>
                              {board.isPinned && (
                                 <Badge bg="danger">
                                    <i className="fas fa-thumbtack me-1"></i>공지
                                 </Badge>
                              )}
                              <div className="postMeta ms-auto">
                                 <div className={styles.postTime}>{formatTimeAgo(board.createdAt)}</div>
                              </div>
                           </div>

                           <h5 className={styles.postTitle}>{board.title}</h5>

                           {board.content && <p className={styles.postContent}>{board.content}</p>}

                           <div className={styles.postFooter}>
                              <div className={styles.authorInfo}>
                                 <img
                                    src="./vite.svg"
                                    alt={board.user_id ? `사용자${board.user_id}` : '익명'}
                                    className={styles.authorImage}
                                    onError={(e) => {
                                       e.target.src = './vite.svg'
                                    }}
                                 />
                                 <div className={styles.authorName}>
                                    {board.user_id ? `사용자${board.user_id}` : '익명'}
                                    {getLevelBadge('Bronze')}
                                 </div>
                              </div>

                              <div className={styles.postStats}>
                                 <span className={styles.stat}>
                                    <i className="fas fa-eye me-1"></i>
                                    {(board.view_count || 0).toLocaleString()}
                                 </span>
                                 <span className={styles.stat}>
                                    <i className="fas fa-heart me-1"></i>
                                    {board.like_count || 0}
                                 </span>
                                 <span className={styles.stat}>
                                    <i className="fas fa-comment me-1"></i>
                                    {board.comment_count || 0}
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
