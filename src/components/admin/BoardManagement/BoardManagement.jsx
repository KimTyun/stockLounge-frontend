import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk, createCategoryThunk, deleteCategoryThunk, getBoardsThunk, deleteBoardThunk } from '../../../features/adminSlice'
import { Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal } from 'react-bootstrap'

const BoardManagement = () => {
   const dispatch = useDispatch()
   const { categories, boards } = useSelector((state) => state.admin)

   const [searchTerm, setSearchTerm] = useState('')
   const [selectedPost, setSelectedPost] = useState(null)
   const [showModal, setShowModal] = useState(false)
   const [filterStatus, setFilterStatus] = useState('all')
   const [sortBy, setSortBy] = useState('created')
   const [newCategory, setNewCategory] = useState('')
   const [selectedCategoryId, setSelectedCategoryId] = useState(null)

   // 데이터 로드
   useEffect(() => {
      dispatch(getCategoriesThunk())
      dispatch(getBoardsThunk())
   }, [dispatch])

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
      return <Badge bg={variants[status]}>{labels[status]}</Badge>
   }

   const getCategoryBadge = (category) => {
      return (
         <Badge bg="secondary" className="me-1">
            {category}
         </Badge>
      )
   }

   // 게시판 추가
   const handleAddCategory = () => {
      if (!newCategory.trim()) return
      dispatch(createCategoryThunk(newCategory))
      setNewCategory('')
   }

   // 게시판 삭제
   const handleDeleteCategory = (id) => {
      if (window.confirm('해당 게시판를 삭제하시겠습니까?')) {
         dispatch(deleteCategoryThunk(id))
      }
   }

   // 게시글 액션
   const handlePostAction = (post, action) => {
      setSelectedPost(post)
      if (action === 'view') {
         setShowModal(true)
      } else if (action === 'delete') {
         if (window.confirm(`"${post.title}" 게시글을 삭제하시겠습니까?`)) {
            dispatch(deleteBoardThunk(post.id))
         }
      }
   }

   const safeBoards = boards || []

   const filteredPosts = safeBoards.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.User?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || post.status === filterStatus
      return matchesSearch && matchesStatus
   })

   const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
         case 'title':
            return a.title.localeCompare(b.title)
         case 'author':
            return a.User?.name.localeCompare(b.User?.name)
         case 'created':
            return new Date(b.created_at) - new Date(a.created_at)
         case 'views':
            return b.view_count - a.view_count
         default:
            return 0
      }
   })

   const PostDetailModal = () => (
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>게시글 상세 정보</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {selectedPost && (
               <>
                  <h5>{selectedPost.title}</h5>
                  <div className="mb-2">{getCategoryBadge(selectedPost.category)}</div>
                  <small className="text-muted">
                     작성자: {selectedPost.User?.name} | 작성일: {new Date(selectedPost.created_at).toLocaleString()}
                  </small>
                  <hr />
                  <p>{selectedPost.content}</p>
               </>
            )}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
               닫기
            </Button>
            {selectedPost && (
               <Button
                  variant="danger"
                  onClick={() => {
                     handlePostAction(selectedPost, 'delete')
                     setShowModal(false)
                  }}
               >
                  삭제
               </Button>
            )}
         </Modal.Footer>
      </Modal>
   )

   return (
      <div>
         {/* 게시판 관리 */}
         <Card className="mb-4">
            <Card.Header>
               <h5 className="mb-0">게시판 관리</h5>
            </Card.Header>
            <Card.Body>
               <Row className="mb-3">
                  <Col md={6}>
                     <InputGroup>
                        <Form.Control type="text" placeholder="새 게시판명 입력" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                        <Button onClick={handleAddCategory}>추가</Button>
                     </InputGroup>
                  </Col>
               </Row>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>게시판명</th>
                        <th>관리</th>
                     </tr>
                  </thead>
                  <tbody>
                     {categories.map((cat, index) => (
                        <tr key={cat.id ?? index} className={selectedCategoryId === cat.id ? 'table-active' : ''} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategoryId(cat.id)}>
                           <td>{cat.id}</td>
                           <td>{cat.category}</td>
                           <td>
                              <Button
                                 variant="outline-danger"
                                 size="sm"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteCategory(cat.id)
                                 }}
                              >
                                 삭제
                              </Button>
                           </td>
                        </tr>
                     ))}
                     {categories.length === 0 && (
                        <tr>
                           <td colSpan="3" className="text-center text-muted">
                              등록된 게시판이 없습니다.
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </Card.Body>
         </Card>

         {/* 게시글 관리 */}
         <Card>
            <Card.Header>
               <h5 className="mb-0">게시글 관리</h5>
            </Card.Header>
            <Card.Body>
               {/* 검색 & 필터 */}
               <Row className="mb-3">
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
                     </Form.Select>
                  </Col>
                  <Col md={2} className="text-end text-muted">
                     총 {sortedPosts.length}개
                  </Col>
               </Row>

               {/* 게시글 테이블 */}
               <Table responsive bordered hover>
                  <thead>
                     <tr>
                        <th>제목</th>
                        <th>게시판</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회</th>
                        <th>상태</th>
                        <th>관리</th>
                     </tr>
                  </thead>
                  <tbody>
                     {sortedPosts.map((post, index) => (
                        <tr key={post.id ?? index}>
                           <td>{post.title}</td>
                           <td>{getCategoryBadge(post.category)}</td>
                           <td>{post.User?.name}</td>
                           <td>{new Date(post.created_at).toLocaleDateString()}</td>
                           <td>{post.view_count}</td>
                           <td>{getStatusBadge(post.status)}</td>
                           <td>
                              <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handlePostAction(post, 'view')}>
                                 보기
                              </Button>
                              <Button variant="outline-danger" size="sm" onClick={() => handlePostAction(post, 'delete')}>
                                 삭제
                              </Button>
                           </td>
                        </tr>
                     ))}
                     {sortedPosts.length === 0 && (
                        <tr>
                           <td colSpan="7" className="text-center text-muted">
                              검색 조건에 맞는 게시글이 없습니다.
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </Card.Body>
         </Card>

         <PostDetailModal />
      </div>
   )
}

export default BoardManagement
