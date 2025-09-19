import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Table, Badge, Button, Spinner, Alert } from 'react-bootstrap'
import styles from '../../../styles/components/admin/admin-common.module.css'
import { getBoardThunk } from '../../../features/boardSlice'
import { getUsersThunk } from '../../../features/userSlice'

const Dashboard = () => {
   const dispatch = useDispatch()
   // Redux 상태를 `adminState`가 아닌 `user`와 `boards`에서 직접 가져오도록 수정
   const { users, loading: userLoading, error: userError } = useSelector((state) => state.user)
   const { boards, loading: boardLoading, error: boardError } = useSelector((state) => state.board)

   const [showAlert, setShowAlert] = useState(false)
   const [alertMessage, setAlertMessage] = useState('')
   const [alertType, setAlertType] = useState('danger')

   const showTimedAlert = (message, type) => {
      setAlertMessage(message)
      setAlertType(type)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
   }

   // 데이터 로드
   useEffect(() => {
      dispatch(getUsersThunk())
      dispatch(getBoardThunk())
   }, [dispatch])

   // 오류 알람 처리
   useEffect(() => {
      if (userError || boardError) {
         showTimedAlert('데이터 로딩 중 오류가 발생했습니다.', 'danger')
      }
   }, [userError, boardError])

   if (userLoading || boardLoading) {
      return (
         <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Spinner animation="border" role="status" className="text-primary">
               <span className="visually-hidden">로딩 중...</span>
            </Spinner>
            <p className="ms-3">데이터를 불러오는 중입니다...</p>
         </div>
      )
   }

   const formatNumber = (num) => {
      return num ? num.toLocaleString() : '0'
   }

   const renderStatCard = (title, value, icon, colorClass) => (
      <Col lg={6} md={6} className="mb-4">
         <Card className={styles.dashboardCard}>
            <Card.Body className="text-center">
               <div className={`${styles.cardIcon} ${styles[colorClass]}`}>
                  <i className={icon}></i>
               </div>
               <h3 className={styles.cardNumber}>{formatNumber(value)}</h3>
               <p className={styles.cardLabel}>{title}</p>
            </Card.Body>
         </Card>
      </Col>
   )

   const getStatusBadge = (status) => {
      const variants = {
         active: 'success',
         pending: 'warning',
         inactive: 'secondary',
         banned: 'danger',
      }

      const labels = {
         active: '활성',
         pending: '대기',
         inactive: '비활성',
         banned: '정지',
      }

      return (
         <Badge bg={variants[status]} className={styles.statusBadge}>
            {labels[status]}
         </Badge>
      )
   }

   return (
      <div className={styles.adminContainer}>
         {showAlert && (
            <Alert variant={alertType} className="mb-4">
               {alertMessage}
            </Alert>
         )}

         <Row>
            {renderStatCard('총 회원수', users?.length, 'fas fa-users', 'iconPrimary')}
            {renderStatCard('총 게시글', boards?.length, 'fas fa-file-alt', 'iconSuccess')}
         </Row>

         <Row>
            <Col lg={12} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-user-plus me-2"></i>
                        최근 가입 회원
                     </h4>
                  </div>
                  <Card.Body className="p-0">
                     <div className={styles.tableContainer}>
                        <Table responsive className={styles.adminTable}>
                           <thead>
                              <tr>
                                 <th>ID</th>
                                 <th>닉네임</th>
                                 <th>상태</th>
                              </tr>
                           </thead>
                           <tbody>
                              {users && users.length > 0 ? (
                                 users.slice(0, 10).map((user) => (
                                    <tr key={user.id}>
                                       <td>{user.id}</td>
                                       <td>{user.name}</td>
                                       <td>{getStatusBadge(user.status)}</td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td colSpan="3" className="text-center text-muted py-3">
                                       최근 가입한 회원이 없습니다.
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </Table>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
            <Col lg={12} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-file-alt me-2"></i>
                        최근 게시글
                     </h4>
                  </div>
                  <Card.Body className="p-0">
                     <div className={styles.tableContainer}>
                        <Table responsive className={styles.adminTable}>
                           <thead>
                              <tr>
                                 <th>게시글 제목</th>
                                 <th>작성자</th>
                                 <th>생성일</th>
                              </tr>
                           </thead>
                           <tbody>
                              {boards && boards.length > 0 ? (
                                 boards.slice(0, 10).map((board) => (
                                    <tr key={board.id}>
                                       <td>{board.title}</td>
                                       <td>{board.author}</td>
                                       <td>{board.created}</td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td colSpan="3" className="text-center text-muted py-3">
                                       최근 게시글이 없습니다.
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </Table>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default Dashboard
