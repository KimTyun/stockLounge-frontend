import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap'
import styles from '../../../styles/components/admin/admin-common.module.css'
import { getBoardsAsync, getUsersAsync } from '../../../features/adminSlice'

const Dashboard = () => {
   const dispatch = useDispatch()
   const { users, boards, loading, error } = useSelector((state) => state.admin)

   useEffect(() => {
      dispatch(getUsersAsync())
      dispatch(getBoardsAsync())
   }, [dispatch])

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

   // 상태 버튼
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

   // 로딩이나 에러 처리
   if (loading) {
      return (
         <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">로딩 중...</span>
            </div>
            <p className="ms-3">데이터를 불러오는 중입니다...</p>
         </div>
      )
   }

   if (error) {
      return <div className="alert alert-danger text-center mt-4">오류가 발생했습니다: {error}</div>
   }

   // // 최근 회원가입 (실제로는 API에서 가져올 예정)
   // const recentUsers = [
   //    { id: 1, nickname: '크립토투자자', email: 'crypto@example.com', joinDate: '2025-09-04 14:30', status: 'active' },
   //    { id: 2, nickname: '비트코인매니아', email: 'bitcoin@example.com', joinDate: '2025-09-04 13:15', status: 'active' },
   //    { id: 3, nickname: '이더리움홀더', email: 'ethereum@example.com', joinDate: '2025-09-04 12:45', status: 'pending' },
   //    { id: 4, nickname: '알트코인러버', email: 'altcoin@example.com', joinDate: '2025-09-04 11:30', status: 'active' },
   //    { id: 5, nickname: '트레이딩킹', email: 'trading@example.com', joinDate: '2025-09-04 10:20', status: 'active' },
   // ]

   // // 최근 게시글 (실제로는 API에서 가져올 예정)
   // const recentPosts = [
   //    { id: 1, title: '비트코인 급등, 이번엔 진짜일까?', author: '크립토분석가', views: 1247, comments: 23, created: '2025-09-04 15:30' },
   //    { id: 2, title: '이더리움 2.0 업데이트 완료 소식', author: '블록체인전문가', views: 892, comments: 15, created: '2025-09-04 14:45' },
   //    { id: 3, title: '알트코인 시즌이 올까? 주요 지표 분석', author: '투자전략가', views: 1056, comments: 31, created: '2025-09-04 13:20' },
   //    { id: 4, title: 'DeFi 프로토콜 해킹 사건 분석', author: '보안전문가', views: 743, comments: 18, created: '2025-09-04 12:15' },
   //    { id: 5, title: 'NFT 시장 동향과 향후 전망', author: 'NFT컬렉터', views: 625, comments: 12, created: '2025-09-04 11:40' },
   // ]

   return (
      <div>
         {/* 통계 */}
         <Row>
            {/* 총 회원수 - users 배열 길이 사용 */}
            {renderStatCard('총 회원수', users.length, 'fas fa-users', 'iconPrimary')}
            {/* 총 게시글 - boards 배열 길이 사용 */}
            {renderStatCard('총 게시판', boards.length, 'fas fa-file-alt', 'iconSuccess')}
         </Row>

         {/* 최근 활동 */}
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
                              {/* Redux에서 가져온 users 배열 사용 */}
                              {users.slice(0, 10).map((user) => (
                                 <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nickname}</td>
                                    <td>{getStatusBadge(user.status)}</td>
                                 </tr>
                              ))}
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
                        최근 게시판
                     </h4>
                  </div>
                  <Card.Body className="p-0">
                     <div className={styles.tableContainer}>
                        <Table responsive className={styles.adminTable}>
                           <thead>
                              <tr>
                                 <th>게시판명</th>
                                 <th>작성자</th>
                                 <th>생성일</th>
                              </tr>
                           </thead>
                           <tbody>
                              {/* Redux에서 가져온 boards 배열 사용 */}
                              {boards.slice(0, 10).map((board) => (
                                 <tr key={board.id}>
                                    <td>{board.name}</td>
                                    <td>{board.author}</td>
                                    <td>{board.createdAt}</td>
                                 </tr>
                              ))}
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
