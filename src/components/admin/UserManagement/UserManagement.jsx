import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Badge, Button, Form, InputGroup, Modal, Alert, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersThunk, updateUserStatusThunk, deleteUserThunk } from '../../../features/adminSlice'
import styles from '../../../styles/pages/Admin.module.css'

const UserManagement = () => {
   const dispatch = useDispatch()
   const {
      users,
      loading: { users: usersLoading },
      error,
   } = useSelector((state) => state.admin)

   const [searchTerm, setSearchTerm] = useState('')
   const [selectedUser, setSelectedUser] = useState(null)
   const [showModal, setShowModal] = useState(false)
   const [filterStatus, setFilterStatus] = useState('all')
   const [sortBy, setSortBy] = useState('joinDate')
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 10

   useEffect(() => {
      dispatch(getUsersThunk({ limit: itemsPerPage, page: currentPage })) // currentPage를 사용하도록 수정
   }, [dispatch, currentPage])

   const getStatusBadge = (user) => {
      // 백엔드에서 밴 여부만 가져옴
      const status = user.is_ban ? 'banned' : 'active'

      const variants = {
         active: 'success',
         pending: 'warning',
         inactive: 'secondary',
         banned: 'danger',
      }

      const labels = {
         active: '활성',
         pending: '승인대기',
         inactive: '비활성',
         banned: '정지',
      }

      return (
         <Badge bg={variants[status]} className={styles.statusBadge}>
            {labels[status]}
         </Badge>
      )
   }

   // 사용자 관리
   const handleUserAction = (user, action) => {
      setSelectedUser(user)
      if (action === 'view') {
         setShowModal(true)
      } else if (action === 'ban') {
         if (window.confirm(`사용자 ${user.nickname}님을 정지하시겠습니까?`)) {
            dispatch(updateUserStatusThunk({ userId: user.id, isBanned: true }))
         }
      } else if (action === 'activate') {
         if (window.confirm(`사용자 ${user.nickname}님의 정지를 해제하시겠습니까?`)) {
            dispatch(updateUserStatusThunk({ userId: user.id, isBanned: false }))
         }
      } else if (action === 'delete') {
         if (window.confirm(`사용자 ${user.nickname}님을 삭제하시겠습니까?`)) {
            dispatch(deleteUserThunk(user.id))
         }
      }
   }

   const filteredUsers = (users || []).filter((user) => {
      const matchesSearch = user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
      // is_ban 필드 기반으로 필터링
      const matchesStatus = filterStatus === 'all' || (filterStatus === 'banned' ? user.is_ban : !user.is_ban)
      return matchesSearch && matchesStatus
   })

   const sortedUsers = [...filteredUsers].sort((a, b) => {
      switch (sortBy) {
         case 'nickname':
            return a.nickname.localeCompare(b.nickname)
         case 'joinDate':
            return new Date(b.joinDate) - new Date(a.joinDate)
         case 'lastLogin':
            return new Date(b.lastLogin) - new Date(a.lastLogin)
         case 'points':
            return b.points - a.points
         default:
            return 0
      }
   })

   const UserDetailModal = () => (
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
         <Modal.Header closeButton>
            <Modal.Title>사용자 상세 정보</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {selectedUser && (
               <Row>
                  <Col md={6}>
                     <h5>기본 정보</h5>
                     <Table striped bordered>
                        <tbody>
                           <tr>
                              <td>
                                 <strong>닉네임</strong>
                              </td>
                              <td>{selectedUser.nickname}</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>이메일</strong>
                              </td>
                              <td>{selectedUser.email}</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>가입일</strong>
                              </td>
                              <td>{selectedUser.joinDate}</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>최근 로그인</strong>
                              </td>
                              <td>{selectedUser.lastLogin}</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>상태</strong>
                              </td>
                              <td>{getStatusBadge(selectedUser)}</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Col>
                  <Col md={6}>
                     <h5>활동 정보</h5>
                     <Table striped bordered>
                        <tbody>
                           <tr>
                              <td>
                                 <strong>작성 게시글</strong>
                              </td>
                              <td>{selectedUser.posts}개</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>작성 댓글</strong>
                              </td>
                              <td>{selectedUser.comments}개</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>보유 포인트</strong>
                              </td>
                              <td>{selectedUser.Reward?.point.toLocaleString() || '0'}P</td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>경고 횟수</strong>
                              </td>
                              <td>
                                 <span className={selectedUser.warnings > 0 ? 'text-danger' : 'text-success'}>{selectedUser.warnings}회</span>
                              </td>
                           </tr>
                        </tbody>
                     </Table>

                     {selectedUser.warnings > 0 && (
                        <Alert variant="warning">
                           <i className="fas fa-exclamation-triangle me-2"></i>이 사용자는 {selectedUser.warnings}회의 경고를 받았습니다.
                        </Alert>
                     )}
                  </Col>
               </Row>
            )}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
               닫기
            </Button>
            {selectedUser && selectedUser.status === 'active' && (
               <Button
                  variant="warning"
                  onClick={() => {
                     handleUserAction(selectedUser, 'ban')
                     setShowModal(false)
                  }}
               >
                  계정 정지
               </Button>
            )}
            {selectedUser && selectedUser.status === 'banned' && (
               <Button
                  variant="success"
                  onClick={() => {
                     handleUserAction(selectedUser, 'activate')
                     setShowModal(false)
                  }}
               >
                  계정 활성화
               </Button>
            )}
         </Modal.Footer>
      </Modal>
   )
   const totalPages = Math.ceil((users || []).length / itemsPerPage)
   return (
      <div>
         <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
               <h4 className={styles.cardTitle}>
                  <i className="fas fa-users me-2"></i>
                  회원 관리
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
                        <Form.Control type="text" placeholder="닉네임 또는 이메일로 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                     </InputGroup>
                  </Col>
                  <Col md={3}>
                     <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">전체 상태</option>
                        <option value="active">활성</option>
                        <option value="pending">승인대기</option>
                        <option value="inactive">비활성</option>
                        <option value="banned">정지</option>
                     </Form.Select>
                  </Col>
                  <Col md={3}>
                     <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="joinDate">가입일순</option>
                        <option value="nickname">닉네임순</option>
                        <option value="lastLogin">최근 로그인순</option>
                        <option value="points">포인트순</option>
                     </Form.Select>
                  </Col>
                  <Col md={2}>
                     <div className="text-muted">총 {(users || []).length}명</div>
                  </Col>
               </Row>

               {/* 로딩, 에러, 데이터 없음 상태 처리 */}
               {usersLoading ? (
                  <div className="text-center py-5">
                     <Spinner animation="border" role="status" className="mb-3">
                        <span className="visually-hidden">Loading...</span>
                     </Spinner>
                     <p className="text-muted">사용자 정보를 불러오는 중입니다...</p>
                  </div>
               ) : error ? (
                  <Alert variant="danger" className="text-center">
                     <i className="fas fa-exclamation-circle me-2"></i>
                     {error}
                  </Alert>
               ) : sortedUsers.length === 0 ? (
                  <div className="text-center py-4">
                     <i className="fas fa-users fa-3x text-muted mb-3"></i>
                     <p className="text-muted">검색 조건에 맞는 사용자가 없습니다.</p>
                  </div>
               ) : (
                  /* 사용자 목록 테이블 */
                  <div className={styles.tableContainer}>
                     <Table responsive className={styles.adminTable}>
                        <thead>
                           <tr>
                              <th>닉네임</th>
                              <th>이메일</th>
                              <th>가입일</th>
                              <th>최근 로그인</th>
                              <th>보유 포인트</th>
                              <th>상태</th>
                              <th>관리</th>
                           </tr>
                        </thead>
                        <tbody>
                           {sortedUsers.map((user) => (
                              <tr key={user.id}>
                                 <td>
                                    <strong>{user.nickname}</strong>
                                 </td>
                                 <td>{user.email}</td>
                                 <td>{user.joinDate}</td>
                                 <td>{user.lastLogin}</td>
                                 <td>{user.Reward?.point.toLocaleString() || '0'}P</td>
                                 <td>
                                    <span className={user.warnings > 0 ? 'text-danger' : 'text-success'}>{user.warnings}</span>
                                 </td>
                                 <td>
                                    <Button variant="outline-primary" size="sm" className={`${styles.actionButton} me-1`} onClick={() => handleUserAction(user, 'view')}>
                                       <i className="fas fa-eye"></i>
                                    </Button>
                                    {user.is_ban ? (
                                       <Button variant="outline-success" size="sm" className={`${styles.actionButton} me-1`} onClick={() => handleUserAction(user, 'activate')}>
                                          <i className="fas fa-check"></i>
                                       </Button>
                                    ) : (
                                       <Button variant="outline-warning" size="sm" className={`${styles.actionButton} me-1`} onClick={() => handleUserAction(user, 'ban')}>
                                          <i className="fas fa-ban"></i>
                                       </Button>
                                    )}
                                    <Button variant="outline-danger" size="sm" className={styles.actionButton} onClick={() => handleUserAction(user, 'delete')}>
                                       <i className="fas fa-trash"></i>
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
               )}
            </Card.Body>
         </Card>

         <UserDetailModal show={showModal} onHide={() => setShowModal(false)} />
      </div>
   )
}

export default UserManagement
