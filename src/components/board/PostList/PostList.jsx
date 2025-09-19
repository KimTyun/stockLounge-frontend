import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, Pagination, Collapse } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/components/board/PostList.module.css'
import PostEditor from '../PostEditor/PostEditor'

import { useDispatch, useSelector } from 'react-redux'
import { getBoardThunk } from '../../../features/boardSlice'
import { getMeThunk } from '../../../features/userSlice'

const PostList = ({ category = 'free' }) => {
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages] = useState(1)
   const [write, setWrite] = useState(false)

   const [editPostId, setEditPostId] = useState(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { boards, error, loading } = useSelector((state) => state.board)
   const { user } = useSelector((state) => state.user)

   useEffect(() => {
      dispatch(getBoardThunk(category))
   }, [dispatch, category])

   const handlePostClick = (id) => {
      navigate(`/board/${id}`)
   }

   const handleWritePost = () => {
      setWrite(!write)
      setEditPostId(null)
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
      return <div>로딩 중...</div>
   }
   if (error) {
      return <div>{error}</div>
   }

   return (
      <div className={styles.postList}>
         {editPostId ? (
            <>
               <div className={styles.header}>
                  <div className={styles.headerLeft}>
                     <h4>게시글 수정</h4>
                     <p className="text-muted">게시글을 수정합니다</p>
                  </div>
                  <div>
                     <Button variant="secondary" onClick={() => setEditPostId(null)} className={`${styles.writeButton} ms-auto d-flex`}>
                        <i className="fas fa-times me-2"></i>
                        취소
                     </Button>
                  </div>
               </div>
               <Card>
                  <Card.Body>
                     <PostEditor
                        editPostId={editPostId}
                        defaultCategory={category}
                        onSuccess={() => {
                           setEditPostId(null)
                           dispatch(getBoardThunk(category))
                        }}
                     />
                  </Card.Body>
               </Card>
            </>
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
                           <PostEditor
                              defaultCategory={category}
                              onSuccess={() => {
                                 setWrite(false)
                                 dispatch(getBoardThunk(category))
                              }}
                           />
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
                     {boards && boards.length > 0 ? (
                        boards.map((board) => (
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
                                 <span className={styles.authorName}>{board.User ? `${board.User.name}` : '익명'}</span>
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
                              <div className={styles.dateColumn}>{formatTimeAgo(board.created_at)}</div>
                           </li>
                        ))
                     ) : (
                        <div className="text-center py-4">
                           <p className="text-muted">'{category}' 카테고리에 게시글이 없습니다.</p>
                           <p className="text-muted">첫 번째 게시글을 작성해보세요!</p>
                        </div>
                     )}
                  </ul>
               </div>

               {/* 1000px 이하일때 */}
               <div className={`${styles.posts} ${styles.cardView}`}>
                  {boards && boards.length > 0 ? (
                     boards.map((board) => (
                        <Card key={board.id} className={`${styles.postCard} ${board.isPinned ? styles.pinned : ''}`} onClick={() => handlePostClick(board.id)}>
                           <Card.Body>
                              <div className={styles.postHeader}>
                                 {board.isPinned && (
                                    <Badge bg="danger">
                                       <i className="fas fa-thumbtack me-1"></i>공지
                                    </Badge>
                                 )}
                                 <div className="postMeta ms-auto">
                                    <div className={styles.postTime}>{formatTimeAgo(board.created_at)}</div>
                                 </div>
                              </div>

                              <h5 className={styles.postTitle}>{board.title}</h5>

                              {/* 게시글 내용 미리보기 내용 */}
                              {board.content && (
                                 <div
                                    className={styles.postContent}
                                    // React에서 HTML 문자열을 직접 DOM에 삽입할 때 사용하는 속성
                                    // 보안상 위험할 수 있어 이름 앞에 dangerously가 붙음.
                                    dangerouslySetInnerHTML={{
                                       __html: board.content.length > 100 ? board.content.substring(0, 200) + '...' : board.content,
                                    }}
                                 />
                              )}

                              <div className={styles.postFooter}>
                                 <div className={styles.authorInfo}>
                                    <img
                                       src={board.User?.profile_img ? (board.User.profile_img.startsWith('http') ? board.User.profile_img : `${import.meta.env.VITE_API_URL}${board.User.profile_img}`) : `./vite.svg`}
                                       alt={board.user_id ? `사용자${board.user_id}` : '익명'}
                                       className={styles.authorImage}
                                       onError={(e) => {
                                          e.target.src = './vite.svg'
                                       }}
                                    />
                                    <div className={styles.authorName}>
                                       {board.User ? board.User.name || `사용자${board.user_id}` : board.user_id ? `사용자${board.user_id}` : '익명'}
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
                     ))
                  ) : (
                     <div className="text-center py-4">
                        <p className="text-muted">'{category}' 카테고리에 게시글이 없습니다.</p>
                        <p className="text-muted">첫 번째 게시글을 작성해보세요!</p>
                     </div>
                  )}
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
