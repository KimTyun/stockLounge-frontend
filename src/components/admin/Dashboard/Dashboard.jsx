import React from 'react'
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap'
import styles from '../admin-common.module.css'

const Dashboard = () => {
   // 대시보드 통계 데이터 (실제로는 API에서 가져올 예정)
   const dashboardStats = {
      totalUsers: 5420,
      totalPosts: 8764,
      totalComments: 23451,
      todayVisitors: 1247,
      todayPosts: 89,
      userGrowth: 12.5,
      postGrowth: -2.3,
      commentGrowth: 15.7,
      visitorGrowth: 8.2,
      postGrowthToday: 23.4,
   }

   // 최근 회원가입 (실제로는 API에서 가져올 예정)
   const recentUsers = [
      { id: 1, nickname: '크립토투자자', email: 'crypto@example.com', joinDate: '2025-09-04 14:30', status: 'active' },
      { id: 2, nickname: '비트코인매니아', email: 'bitcoin@example.com', joinDate: '2025-09-04 13:15', status: 'active' },
      { id: 3, nickname: '이더리움홀더', email: 'ethereum@example.com', joinDate: '2025-09-04 12:45', status: 'pending' },
      { id: 4, nickname: '알트코인러버', email: 'altcoin@example.com', joinDate: '2025-09-04 11:30', status: 'active' },
      { id: 5, nickname: '트레이딩킹', email: 'trading@example.com', joinDate: '2025-09-04 10:20', status: 'active' },
   ]

   // 최근 게시글 (실제로는 API에서 가져올 예정)
   const recentPosts = [
      { id: 1, title: '비트코인 급등, 이번엔 진짜일까?', author: '크립토분석가', views: 1247, comments: 23, created: '2025-09-04 15:30' },
      { id: 2, title: '이더리움 2.0 업데이트 완료 소식', author: '블록체인전문가', views: 892, comments: 15, created: '2025-09-04 14:45' },
      { id: 3, title: '알트코인 시즌이 올까? 주요 지표 분석', author: '투자전략가', views: 1056, comments: 31, created: '2025-09-04 13:20' },
      { id: 4, title: 'DeFi 프로토콜 해킹 사건 분석', author: '보안전문가', views: 743, comments: 18, created: '2025-09-04 12:15' },
      { id: 5, title: 'NFT 시장 동향과 향후 전망', author: 'NFT컬렉터', views: 625, comments: 12, created: '2025-09-04 11:40' },
   ]

   const formatNumber = (num) => {
      return num.toLocaleString()
   }

   const renderStatCard = (title, value, change, icon, colorClass) => (
      <Col lg={6} md={2} className="mb-4">
         <Card className={styles.dashboardCard}>
            <Card.Body className="text-center">
               <div className={`${styles.cardIcon} ${styles[colorClass]}`}>
                  <i className={icon}></i>
               </div>
               <h3 className={styles.cardNumber}>{formatNumber(value)}</h3>
               <p className={styles.cardLabel}>{title}</p>
               {change && (
                  <div className={`${styles.cardChange} ${change > 0 ? styles.changePositive : styles.changeNegative}`}>
                     <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'}`}></i>
                     {Math.abs(change)}% (전월 대비)
                  </div>
               )}
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
      <div>
         {/* 통계 카드 섹션 */}
         <Row>
            {renderStatCard('총 회원수', dashboardStats.totalUsers, dashboardStats.userGrowth, 'fas fa-users', 'iconPrimary')}
            {renderStatCard('총 게시글', dashboardStats.totalPosts, dashboardStats.postGrowth, 'fas fa-file-alt', 'iconSuccess')}
            {renderStatCard('총 댓글', dashboardStats.totalComments, dashboardStats.commentGrowth, 'fas fa-comments', 'iconInfo')}
            {renderStatCard('오늘 방문자', dashboardStats.todayVisitors, dashboardStats.visitorGrowth, 'fas fa-eye', 'iconWarning')}
         </Row>

         {/* 오늘의 활동 */}
         <Row>
            <Col lg={6} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-chart-line me-2"></i>
                        오늘의 활동
                     </h4>
                  </div>
                  <Card.Body>
                     <Row>
                        <Col md={6} className="text-center mb-3">
                           <div className={`${styles.cardIcon} ${styles.iconSuccess} mx-auto`}>
                              <i className="fas fa-plus"></i>
                           </div>
                           <h4 className={styles.cardNumber}>{dashboardStats.todayPosts}</h4>
                           <p className={styles.cardLabel}>오늘 작성된 게시글</p>
                           <div className={`${styles.cardChange} ${styles.changePositive}`}>
                              <i className="fas fa-arrow-up"></i>
                              {dashboardStats.postGrowthToday}% (어제 대비)
                           </div>
                        </Col>
                        <Col md={6} className="text-center mb-3">
                           <div className={`${styles.cardIcon} ${styles.iconInfo} mx-auto`}>
                              <i className="fas fa-user-plus"></i>
                           </div>
                           <h4 className={styles.cardNumber}>27</h4>
                           <p className={styles.cardLabel}>오늘 가입한 회원</p>
                           <div className={`${styles.cardChange} ${styles.changePositive}`}>
                              <i className="fas fa-arrow-up"></i>
                              18.5% (어제 대비)
                           </div>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>

            <Col lg={6} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        관리 알림
                     </h4>
                  </div>
                  <Card.Body>
                     <div className="d-flex align-items-center mb-3 p-3 bg-warning bg-opacity-10 rounded">
                        <i className="fas fa-flag text-warning me-3"></i>
                        <div>
                           <strong>신고된 게시글</strong>
                           <br />
                           <small className="text-muted">5건의 신고가 대기 중입니다.</small>
                        </div>
                     </div>
                     <div className="d-flex align-items-center mb-3 p-3 bg-danger bg-opacity-10 rounded">
                        <i className="fas fa-user-slash text-danger me-3"></i>
                        <div>
                           <strong>계정 정지 검토</strong>
                           <br />
                           <small className="text-muted">3건의 계정이 검토 대기 중입니다.</small>
                        </div>
                     </div>
                     <div className="d-flex align-items-center p-3 bg-info bg-opacity-10 rounded">
                        <i className="fas fa-server text-info me-3"></i>
                        <div>
                           <strong>시스템 상태</strong>
                           <br />
                           <small className="text-muted">모든 서비스가 정상 작동 중입니다.</small>
                        </div>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>

         {/* 최근 활동 테이블들 */}
         <Row>
            <Col lg={6} className="mb-4">
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
                                 <th>닉네임</th>
                                 <th>이메일</th>
                                 <th>가입일</th>
                                 <th>상태</th>
                              </tr>
                           </thead>
                           <tbody>
                              {recentUsers.map((user) => (
                                 <tr key={user.id}>
                                    <td>{user.nickname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.joinDate}</td>
                                    <td>{getStatusBadge(user.status)}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </Table>
                     </div>
                  </Card.Body>
               </Card>
            </Col>

            <Col lg={6} className="mb-4">
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
                                 <th>제목</th>
                                 <th>작성자</th>
                                 <th>조회수</th>
                                 <th>댓글</th>
                              </tr>
                           </thead>
                           <tbody>
                              {recentPosts.map((post) => (
                                 <tr key={post.id}>
                                    <td>
                                       <div>{post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}</div>
                                       <small className="text-muted">{post.created}</small>
                                    </td>
                                    <td>{post.author}</td>
                                    <td>{formatNumber(post.views)}</td>
                                    <td>{post.comments}</td>
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
