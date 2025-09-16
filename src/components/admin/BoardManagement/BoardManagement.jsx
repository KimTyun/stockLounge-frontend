import React, { useState } from 'react'
import { Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal } from 'react-bootstrap'
import styles from '../../../styles/components/admin/admin-common.module.css'

const BoardManagement = () => {
   const [searchTerm, setSearchTerm] = useState('')
   const [selectedPost, setSelectedPost] = useState(null)
   const [showModal, setShowModal] = useState(false)
   const [filterStatus, setFilterStatus] = useState('all')
   const [sortBy, setSortBy] = useState('created')
   const [posts, setPosts] = useState([])

   const getStatusBadge = (status) => {
      const variants = {
         published: 'success',
         hidden: 'danger',
         reported: 'warning',
         deleted: 'secondary',
      }

      const labels = {
         published: '게시됨',
         hidden: '숨김',
         reported: '신고됨',
         deleted: '삭제됨',
      }

      return (
         <Badge bg={variants[status]} className={styles.statusBadge}>
            {labels[status]}
         </Badge>
      )
   }

   const getCategoryBadge = (category) => {
      const colors = {
         bitcoin: 'warning',
         ethereum: 'info',
         ripple: 'primary',
         general: 'secondary',
         nft: 'success',
      }

      const labels = {
         bitcoin: '비트코인',
         ethereum: '이더리움',
         ripple: '리플',
         general: '일반',
         nft: 'NFT',
      }

      return (
         <Badge bg={colors[category]} className={styles.statusBadge}>
            {labels[category]}
         </Badge>
      )
   }

   const handlePostAction = (post, action) => {
      setSelectedPost(post)
      if (action === 'view') {
         setShowModal(true)
      } else if (action === 'hide') {
         if (window.confirm(`"${post.title}" 게시글을 숨김 처리하시겠습니까?`)) {
            setPosts(posts.map((p) => (p.id === post.id ? { ...p, status: 'hidden' } : p)))
         }
      } else if (action === 'show') {
         if (window.confirm(`"${post.title}" 게시글을 다시 게시하시겠습니까?`)) {
            setPosts(posts.map((p) => (p.id === post.id ? { ...p, status: 'published' } : p)))
         }
      } else if (action === 'delete') {
         if (window.confirm(`"${post.title}" 게시글을 삭제하시겠습니까?`)) {
            setPosts(posts.filter((p) => p.id !== post.id))
         }
      } else if (action === 'pin') {
         setPosts(posts.map((p) => (p.id === post.id ? { ...p, isPinned: !p.isPinned } : p)))
      } else if (action === 'notice') {
         setPosts(posts.map((p) => (p.id === post.id ? { ...p, isNotice: !p.isNotice } : p)))
      }
   }

   const filteredPosts = posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || post.status === filterStatus
      return matchesSearch && matchesStatus
   })

   const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
         case 'title':
            return a.title.localeCompare(b.title)
         case 'author':
            return a.author.localeCompare(b.author)
         case 'created':
            return new Date(b.created) - new Date(a.created)
         case 'views':
            return b.views - a.views
         case 'reports':
            return b.reports - a.reports
         default:
            return 0
      }
   })

   const PostDetailModal = () => (
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName={styles.customModal}>
         <Modal.Header closeButton>
            <Modal.Title>게시글 상세 정보</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {selectedPost && (
               <div>
                  <Row className="mb-3">
                     <Col>
                        <h5>{selectedPost.title}</h5>
                        <div className="mb-2">
                           {getCategoryBadge(selectedPost.category)}
                           {selectedPost.isNotice && (
                              <Badge bg="primary" className="ms-2">
                                 공지
                              </Badge>
                           )}
                           {selectedPost.isPinned && (
                              <Badge bg="info" className="ms-2">
                                 고정
                              </Badge>
                           )}
                        </div>
                        <small className="text-muted">
                           작성자: {selectedPost.author} | 작성일: {selectedPost.created}
                        </small>
                     </Col>
                  </Row>

                  <Row className="mb-3">
                     <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                           <div className="h4 mb-1">{selectedPost.views.toLocaleString()}</div>
                           <small className="text-muted">조회수</small>
                        </div>
                     </Col>
                     <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                           <div className="h4 mb-1">{selectedPost.comments}</div>
                           <small className="text-muted">댓글</small>
                        </div>
                     </Col>
                     <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                           <div className="h4 mb-1">{selectedPost.likes}</div>
                           <small className="text-muted">추천</small>
                        </div>
                     </Col>
                     <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                           <div className={`h4 mb-1 ${selectedPost.reports > 0 ? 'text-danger' : ''}`}>{selectedPost.reports}</div>
                           <small className="text-muted">신고</small>
                        </div>
                     </Col>
                  </Row>

                  <div className="border rounded p-3">
                     <h6>게시글 내용</h6>
                     <p>{selectedPost.content}</p>
                  </div>

                  {selectedPost.reports > 0 && (
                     <div className="mt-3 p-3 bg-warning bg-opacity-10 border-warning border rounded">
                        <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                        <strong>이 게시글은 {selectedPost.reports}건의 신고가 접수되었습니다.</strong>
                     </div>
                  )}
               </div>
            )}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
               닫기
            </Button>
            {selectedPost && (
               <>
                  <Button
                     variant={selectedPost.isNotice ? 'outline-primary' : 'primary'}
                     onClick={() => {
                        handlePostAction(selectedPost, 'notice')
                        setShowModal(false)
                     }}
                  >
                     {selectedPost.isNotice ? '공지 해제' : '공지 설정'}
                  </Button>
                  <Button
                     variant={selectedPost.isPinned ? 'outline-info' : 'info'}
                     onClick={() => {
                        handlePostAction(selectedPost, 'pin')
                        setShowModal(false)
                     }}
                  >
                     {selectedPost.isPinned ? '고정 해제' : '고정 설정'}
                  </Button>
                  {selectedPost.status === 'published' ? (
                     <Button
                        variant="warning"
                        onClick={() => {
                           handlePostAction(selectedPost, 'hide')
                           setShowModal(false)
                        }}
                     >
                        숨김 처리
                     </Button>
                  ) : (
                     <Button
                        variant="success"
                        onClick={() => {
                           handlePostAction(selectedPost, 'show')
                           setShowModal(false)
                        }}
                     >
                        게시 복원
                     </Button>
                  )}
               </>
            )}
         </Modal.Footer>
      </Modal>
   )

   // 게시글 목록 데이터 (실제로는 API에서 가져올 예정)
   // const [posts, setPosts] = useState([
   //    {
   //       id: 1,
   //       title: '비트코인 급등, 이번엔 진짜일까?',
   //       author: '크립토분석가',
   //       category: 'bitcoin',
   //       content: '최근 비트코인 가격이 급등하고 있습니다. 이번 상승의 배경과 지속 가능성에 대해 분석해보겠습니다...',
   //       views: 1247,
   //       comments: 23,
   //       likes: 156,
   //       reports: 0,
   //       created: '2025-09-04 15:30',
   //       status: 'published',
   //       isNotice: false,
   //       isPinned: false,
   //    },
   //    {
   //       id: 2,
   //       title: '이더리움 2.0 업데이트 완료 소식',
   //       author: '블록체인전문가',
   //       category: 'ethereum',
   //       content: '이더리움 2.0 업데이트가 성공적으로 완료되었습니다. 주요 변경사항과 영향을 살펴보겠습니다...',
   //       views: 892,
   //       comments: 15,
   //       likes: 98,
   //       reports: 1,
   //       created: '2025-09-04 14:45',
   //       status: 'published',
   //       isNotice: true,
   //       isPinned: true,
   //    },
   //    {
   //       id: 3,
   //       title: '스캠 코인 주의! 투자 전 반드시 확인하세요',
   //       author: '투자전략가',
   //       category: 'general',
   //       content: '최근 스캠 코인들이 늘어나고 있습니다. 안전한 투자를 위한 체크포인트를 알려드립니다...',
   //       views: 1056,
   //       comments: 31,
   //       likes: 201,
   //       reports: 5,
   //       created: '2025-09-04 13:20',
   //       status: 'reported',
   //       isNotice: false,
   //       isPinned: false,
   //    },
   //    {
   //       id: 4,
   //       title: '부적절한 내용이 포함된 게시글',
   //       author: '문제사용자',
   //       category: 'general',
   //       content: '이 게시글은 부적절한 내용을 포함하고 있어 숨김 처리되었습니다.',
   //       views: 43,
   //       comments: 2,
   //       likes: 0,
   //       reports: 8,
   //       created: '2025-09-04 12:15',
   //       status: 'hidden',
   //       isNotice: false,
   //       isPinned: false,
   //    },
   //    {
   //       id: 5,
   //       title: 'NFT 시장 동향과 향후 전망',
   //       author: 'NFT컬렉터',
   //       category: 'nft',
   //       content: 'NFT 시장의 최근 동향과 향후 전망에 대해 분석해보겠습니다...',
   //       views: 625,
   //       comments: 12,
   //       likes: 45,
   //       reports: 0,
   //       created: '2025-09-04 11:40',
   //       status: 'published',
   //       isNotice: false,
   //       isPinned: false,
   //    },
   // ])

   return (
      <div>
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-clipboard-list me-2"></i>
                  게시판 관리
               </h4>
            </div>
            <Card.Body>
               {/* 검색 및 필터 */}
               <Row className="mb-4">
                  <Col md={4}>
                     <InputGroup>
                        <InputGroup.Text>
                           <i className="fas fa-search"></i>
                        </InputGroup.Text>
                        <Form.Control type="text" placeholder="제목 또는 작성자로 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                     </InputGroup>
                  </Col>
                  <Col md={3}>
                     <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">전체 상태</option>
                        <option value="published">게시됨</option>
                        <option value="hidden">숨김</option>
                        <option value="reported">신고됨</option>
                        <option value="deleted">삭제됨</option>
                     </Form.Select>
                  </Col>
                  <Col md={3}>
                     <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="created">작성일순</option>
                        <option value="title">제목순</option>
                        <option value="author">작성자순</option>
                        <option value="views">조회수순</option>
                        <option value="reports">신고순</option>
                     </Form.Select>
                  </Col>
                  <Col md={2}>
                     <div className="text-muted">총 {filteredPosts.length}개</div>
                  </Col>
               </Row>

               {/* 게시글 목록 테이블 */}
               <div className={styles.tableContainer}>
                  <Table responsive className={styles.adminTable}>
                     <thead>
                        <tr>
                           <th>제목</th>
                           <th>카테고리</th>
                           <th>작성자</th>
                           <th>작성일</th>
                           <th>조회</th>
                           <th>댓글</th>
                           <th>신고</th>
                           <th>상태</th>
                           <th>관리</th>
                        </tr>
                     </thead>
                     <tbody>
                        {sortedPosts.map((post) => (
                           <tr key={post.id}>
                              <td>
                                 <div>
                                    {post.isPinned && <i className="fas fa-thumbtack text-info me-2"></i>}
                                    {post.isNotice && <i className="fas fa-bullhorn text-primary me-2"></i>}
                                    <strong>{post.title.length > 40 ? `${post.title.substring(0, 40)}...` : post.title}</strong>
                                 </div>
                              </td>
                              <td>{getCategoryBadge(post.category)}</td>
                              <td>{post.author}</td>
                              <td>{post.created.split(' ')[0]}</td>
                              <td>{post.views.toLocaleString()}</td>
                              <td>{post.comments}</td>
                              <td>
                                 <span className={post.reports > 0 ? 'text-danger fw-bold' : ''}>{post.reports}</span>
                              </td>
                              <td>{getStatusBadge(post.status)}</td>
                              <td>
                                 <Button variant="outline-primary" size="sm" className={`${styles.actionButton} me-1`} onClick={() => handlePostAction(post, 'view')}>
                                    <i className="fas fa-eye"></i>
                                 </Button>
                                 {post.status === 'published' ? (
                                    <Button variant="outline-warning" size="sm" className={`${styles.actionButton} me-1`} onClick={() => handlePostAction(post, 'hide')}>
                                       <i className="fas fa-eye-slash"></i>
                                    </Button>
                                 ) : post.status === 'hidden' ? (
                                    <Button variant="outline-success" size="sm" className={`${styles.actionButton} me-1`} onClick={() => handlePostAction(post, 'show')}>
                                       <i className="fas fa-eye"></i>
                                    </Button>
                                 ) : null}
                                 <Button variant="outline-danger" size="sm" className={styles.actionButton} onClick={() => handlePostAction(post, 'delete')}>
                                    <i className="fas fa-trash"></i>
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </div>

               {sortedPosts.length === 0 && (
                  <div className="text-center py-4">
                     <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                     <p className="text-muted">검색 조건에 맞는 게시글이 없습니다.</p>
                  </div>
               )}
            </Card.Body>
         </Card>

         <PostDetailModal />
      </div>
   )
}

export default BoardManagement
