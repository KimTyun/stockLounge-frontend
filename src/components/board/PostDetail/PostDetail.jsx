import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CommentList from '../CommentList'
import styles from '../../../styles/pages/Board_fixed.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBoardThunk, getBoardByIdThunk, likeBoardThunk } from '../../../features/boardSlice'
import { reportBoardThunk } from '../../../features/reportSlice'

const PostDetail = ({ boardId, onBackToList, onEdit }) => {
   const navigate = useNavigate()

   const dispatch = useDispatch()
   const { board, loadingDetail, error } = useSelector((state) => state.board)

   const handleEdit = () => {
      onEdit(boardId)
   }

   const handleDelete = () => {
      if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
         dispatch(deleteBoardThunk(boardId))
         alert('삭제되었습니다.')
         navigate('/board')
         onBackToList()
      }
   }

   const handleReport = async () => {
      const reason = prompt('신고 사유를 입력해주세요:')
      if (reason && reason.trim()) {
         try {
            await dispatch(
               reportBoardThunk({
                  boardId: boardId,
                  userId: 1, // 실제로는 로그인한 사용자 ID
                  reason: reason.trim(),
               })
            )
            // 신고 후 게시글 정보 다시 가져오기
            dispatch(getBoardByIdThunk(boardId))
            alert('신고가 접수되었습니다. 검토 후 처리하겠습니다.')
         } catch (error) {
            alert('신고 접수에 실패했습니다.')
         }
      }
   }

   const formatDate = (dateString) => {
      if (!dateString) return '날짜 없음'
      const date = new Date(dateString)
      return date.toLocaleDateString('ko-KR', {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
      })
   }

   const onClickBoardHeart = () => {
      if (boardId) {
         dispatch(likeBoardThunk(boardId))
      }
   }

   useEffect(() => {
      // 게시글 상세 정보를 가져오는 로직
      if (boardId) {
         dispatch(getBoardByIdThunk(boardId))
      }
   }, [dispatch, boardId])

   if (loadingDetail) {
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
      )
   }

   if (error) {
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
      )
   }

   if (!board) {
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
      )
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
                              {board.category}
                              {board.report_count > 10 && (
                                 <Badge bg="danger" className="ms-2">
                                    신고됨
                                 </Badge>
                              )}
                           </div>

                           <h1 className={styles.postTitle}>{board.title}</h1>

                           <div className={styles.authorInfo}>
                              <div className={styles.authorProfile}>
                                 <img
                                    src="./vite.svg"
                                    alt={board.user_id ? `사용자${board.user_id}` : '익명'}
                                    className={styles.authorImage}
                                    onError={(e) => {
                                       e.target.src = './vite.svg'
                                    }}
                                 />
                                 <div className={styles.authorDetails}>
                                    <div className={styles.authorName}>
                                       {board.user_id ? `사용자${board.user_id}` : '익명'}
                                       <Badge bg="secondary" className="ms-2">
                                          Bronze
                                       </Badge>
                                    </div>
                                    <div className={styles.postDate}>
                                       작성일: {formatDate(board.createdAt)}
                                       {board.updatedAt !== board.createdAt && <span className="text-muted ms-2">(수정됨: {formatDate(board.updatedAt)})</span>}
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
                              <span>
                                 <i className="fas fa-eye me-1"></i>조회 {(board.view_count || 0).toLocaleString()}
                              </span>
                              <span>
                                 <i className="fas fa-heart me-1 likes"></i>추천 {board.like_count || 0}
                              </span>
                              <span>
                                 <i className="fas fa-flag me-1"></i>신고 {board.report_count || 0}
                              </span>
                           </div>
                        </div>
                     </Card.Body>
                  </Card>

                  {/* 게시글 본문 */}
                  <Card className={styles.contentCard}>
                     <Card.Body>
                        {/* 게시글 이미지 */}
                        {board.board_img && (
                           <div className={styles.postImage}>
                              <img
                                 src={`${import.meta.env.VITE_API_URI}/uploads/${board.board_img}`}
                                 alt="게시글 이미지"
                                 className="img-fluid mb-3"
                                 onError={(e) => {
                                    e.target.style.display = 'none'
                                 }}
                              />
                           </div>
                        )}

                        <div className={styles.postContent}>{board.content ? <div dangerouslySetInnerHTML={{ __html: board.content }} /> : <p className="text-muted">내용이 없습니다.</p>}</div>
                     </Card.Body>
                  </Card>

                  {/* 좋아요 버튼 */}
                  <Card className={styles.actionCard}>
                     <Card.Body>
                        <div className={styles.actionButtons}>
                           <span className={styles.likes}>
                              <i className="fas fa-heart me-1 my-red-icon"></i>
                           </span>
                           <Button onClick={onClickBoardHeart}>{board.like_count || 0}</Button>
                        </div>
                     </Card.Body>
                  </Card>

                  {/* 댓글 섹션 */}
                  <Card className={styles.commentSection}>
                     <Card.Header>
                        <h5>
                           <i className="fas fa-comments me-2"></i>댓글
                        </h5>
                     </Card.Header>
                     <Card.Body>{boardId && <CommentList postId={boardId} />}</Card.Body>
                  </Card>

                  <div className={styles.postNavigation}>
                     <Button variant="secondary" onClick={onBackToList}>
                        <i className="fas fa-list me-2"></i>목록으로
                     </Button>
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default PostDetail
