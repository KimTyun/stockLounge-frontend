// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Row, Col, Card, Table, Form } from 'react-bootstrap'
// import { getStatisticsThunk } from '../../../features/adminSlice'
// import styles from '../../../styles/components/admin/admin-common.module.css'

// const Statistics = () => {
//    const dispatch = useDispatch()
//    const [selectedPeriod, setSelectedPeriod] = useState('week')

//    const { statistics, popularPosts, activeUsers, categoryStats, hourlyStats, loading, error } = useSelector((state) => state.admin)

//    useEffect(() => {
//       // 컴포넌트 마운트 시 전체 통계 데이터 로드
//       dispatch(getStatisticsThunk(selectedPeriod))
//    }, [dispatch, selectedPeriod])

//    // 기간 변경 시 데이터 재로드
//    const handlePeriodChange = (period) => {
//       setSelectedPeriod(period)
//    }

//    const renderStatCard = (title, current, previous, change, icon, colorClass) => (
//       <Col lg={4} md={2} sm={6} className="mb-4">
//          <Card className={styles.dashboardCard}>
//             <Card.Body className="text-center">
//                <div className={`${styles.cardIcon} ${styles[colorClass]} mx-auto`}>
//                   <i className={icon}></i>
//                </div>
//                <h4 className={styles.cardNumber}>{current?.toLocaleString() || 0}</h4>
//                <p className={styles.cardLabel}>{title}</p>
//                <div className={`${styles.cardChange} ${change > 0 ? styles.changePositive : styles.changeNegative}`}>
//                   <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'}`}></i>
//                   {Math.abs(change || 0).toFixed(1)}%
//                </div>
//                <small className="text-muted">이전: {previous?.toLocaleString() || 0}</small>
//             </Card.Body>
//          </Card>
//       </Col>
//    )

//    const getPeriodLabel = () => {
//       switch (selectedPeriod) {
//          case 'week':
//             return '이번 주'
//          case 'month':
//             return '이번 달'
//          case 'year':
//             return '올해'
//          default:
//             return ''
//       }
//    }

//    if (loading) {
//       return (
//          <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
//             <div className="spinner-border text-primary" role="status">
//                <span className="visually-hidden">Loading...</span>
//             </div>
//          </div>
//       )
//    }

//    if (error) {
//       return (
//          <div className="alert alert-danger" role="alert">
//             <h4 className="alert-heading">오류 발생!</h4>
//             <p>{error}</p>
//             <button className="btn btn-outline-danger" onClick={() => dispatch(getStatisticsThunk(selectedPeriod))}>
//                다시 시도
//             </button>
//          </div>
//       )
//    }

//    return (
//       <div>
//          {/* 기간 선택 */}
//          <Card className={styles.contentCard}>
//             <Card.Body>
//                <Row className="align-items-center">
//                   <Col>
//                      <h4 className={styles.cardTitle}>
//                         <i className="fas fa-chart-bar me-2"></i>
//                         통계 대시보드 - {getPeriodLabel()}
//                      </h4>
//                   </Col>
//                   <Col md="auto">
//                      <Form.Select value={selectedPeriod} onChange={(e) => handlePeriodChange(e.target.value)} style={{ width: '150px' }} disabled={loading}>
//                         <option value="week">주간</option>
//                         <option value="month">월간</option>
//                         <option value="year">연간</option>
//                      </Form.Select>
//                   </Col>
//                </Row>
//             </Card.Body>
//          </Card>

//          {/* 주요 통계 카드들 */}
//          <Row>
//             {statistics && (
//                <>
//                   {renderStatCard('방문자', statistics.visitors?.current, statistics.visitors?.previous, statistics.visitors?.change, 'fas fa-users', 'iconPrimary')}
//                   {renderStatCard('페이지뷰', statistics.pageViews?.current, statistics.pageViews?.previous, statistics.pageViews?.change, 'fas fa-eye', 'iconSuccess')}
//                   {renderStatCard('신규가입', statistics.newUsers?.current, statistics.newUsers?.previous, statistics.newUsers?.change, 'fas fa-user-plus', 'iconInfo')}
//                   {renderStatCard('게시글', statistics.posts?.current, statistics.posts?.previous, statistics.posts?.change, 'fas fa-file-alt', 'iconWarning')}
//                   {renderStatCard('댓글', statistics.comments?.current, statistics.comments?.previous, statistics.comments?.change, 'fas fa-comments', 'iconSuccess')}
//                   {renderStatCard('신고', statistics.reports?.current, statistics.reports?.previous, statistics.reports?.change, 'fas fa-flag', 'iconDanger')}
//                </>
//             )}
//          </Row>

//          {/* 상세 통계 */}
//          <Row>
//             {/* 인기 게시글 */}
//             <Col lg={12} className="mb-4">
//                <Card className={styles.contentCard}>
//                   <div className={styles.cardHeader}>
//                      <h4 className={styles.cardTitle}>
//                         <i className="fas fa-fire me-2"></i>
//                         인기 게시글 TOP 5
//                      </h4>
//                   </div>
//                   <Card.Body className="p-0">
//                      <Table responsive className={styles.adminTable}>
//                         <thead>
//                            <tr>
//                               <th>순위</th>
//                               <th>제목</th>
//                               <th>조회수</th>
//                               <th>댓글</th>
//                               <th>추천</th>
//                            </tr>
//                         </thead>
//                         <tbody>
//                            {popularPosts?.length > 0 ? (
//                               popularPosts.map((post, index) => (
//                                  <tr key={post.id || index}>
//                                     <td>
//                                        <div className="d-flex align-items-center">
//                                           <div className={`badge ${index < 3 ? 'bg-warning' : 'bg-secondary'} me-2`}>{index + 1}</div>
//                                           {index === 0 && <i className="fas fa-crown text-warning"></i>}
//                                        </div>
//                                     </td>
//                                     <td>
//                                        <div title={post.title}>{post.title?.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}</div>
//                                     </td>
//                                     <td>{post.view_count?.toLocaleString() || 0}</td>
//                                     <td>{post.comment_count || 0}</td>
//                                     <td>{post.like_count || 0}</td>
//                                  </tr>
//                               ))
//                            ) : (
//                               <tr>
//                                  <td colSpan="5" className="text-center text-muted py-4">
//                                     데이터가 없습니다.
//                                  </td>
//                               </tr>
//                            )}
//                         </tbody>
//                      </Table>
//                   </Card.Body>
//                </Card>
//             </Col>

//             {/* 활성 사용자 */}
//             <Col lg={12} className="mb-4">
//                <Card className={styles.contentCard}>
//                   <div className={styles.cardHeader}>
//                      <h4 className={styles.cardTitle}>
//                         <i className="fas fa-medal me-2"></i>
//                         활성 사용자 TOP 5
//                      </h4>
//                   </div>
//                   <Card.Body className="p-0">
//                      <Table responsive className={styles.adminTable}>
//                         <thead>
//                            <tr>
//                               <th>순위</th>
//                               <th>닉네임</th>
//                               <th>게시글</th>
//                               <th>댓글</th>
//                               <th>포인트</th>
//                            </tr>
//                         </thead>
//                         <tbody>
//                            {activeUsers?.length > 0 ? (
//                               activeUsers.map((user, index) => (
//                                  <tr key={user.id || index}>
//                                     <td>
//                                        <div className="d-flex align-items-center">
//                                           <div className={`badge ${index < 3 ? 'bg-primary' : 'bg-secondary'} me-2`}>{index + 1}</div>
//                                           {index === 0 && <i className="fas fa-star text-warning"></i>}
//                                        </div>
//                                     </td>
//                                     <td>
//                                        <strong>{user.name || '익명'}</strong>
//                                     </td>
//                                     <td>{user.post_count || 0}</td>
//                                     <td>{user.comment_count || 0}</td>
//                                     <td>{user.points?.toLocaleString() || 0}P</td>
//                                  </tr>
//                               ))
//                            ) : (
//                               <tr>
//                                  <td colSpan="5" className="text-center text-muted py-4">
//                                     데이터가 없습니다.
//                                  </td>
//                               </tr>
//                            )}
//                         </tbody>
//                      </Table>
//                   </Card.Body>
//                </Card>
//             </Col>
//          </Row>

//          {/* 카테고리별 통계 */}
//          <Row>
//             <Col lg={6} className="mb-4">
//                <Card className={styles.contentCard}>
//                   <div className={styles.cardHeader}>
//                      <h4 className={styles.cardTitle}>
//                         <i className="fas fa-chart-pie me-2"></i>
//                         카테고리별 게시글 분포
//                      </h4>
//                   </div>
//                   <Card.Body>
//                      {categoryStats?.length > 0 ? (
//                         categoryStats.map((category, index) => (
//                            <div className="mb-3" key={category.id || index}>
//                               <div className="d-flex justify-content-between align-items-center mb-2">
//                                  <span>{category.name}</span>
//                                  <strong>
//                                     {category.count?.toLocaleString() || 0}개 ({category.percentage || 0}%)
//                                  </strong>
//                               </div>
//                               <div className="progress mb-3">
//                                  <div className={`progress-bar ${category.colorClass || 'bg-primary'}`} style={{ width: `${category.percentage || 0}%` }}></div>
//                               </div>
//                            </div>
//                         ))
//                      ) : (
//                         <div className="text-center text-muted py-4">카테고리별 데이터가 없습니다.</div>
//                      )}
//                   </Card.Body>
//                </Card>
//             </Col>

//             <Col lg={6} className="mb-4">
//                <Card className={styles.contentCard}>
//                   <div className={styles.cardHeader}>
//                      <h4 className={styles.cardTitle}>
//                         <i className="fas fa-clock me-2"></i>
//                         시간대별 활동 분포
//                      </h4>
//                   </div>
//                   <Card.Body>
//                      {hourlyStats?.length > 0 ? (
//                         hourlyStats.map((timeSlot, index) => (
//                            <div className="mb-3" key={index}>
//                               <div className="d-flex justify-content-between align-items-center mb-2">
//                                  <span>{timeSlot.timeRange}</span>
//                                  <strong>{timeSlot.percentage || 0}%</strong>
//                               </div>
//                               <div className="progress mb-3">
//                                  <div className={`progress-bar ${timeSlot.colorClass || 'bg-primary'}`} style={{ width: `${timeSlot.percentage || 0}%` }}></div>
//                               </div>
//                            </div>
//                         ))
//                      ) : (
//                         <div className="text-center text-muted py-4">시간대별 데이터가 없습니다.</div>
//                      )}
//                   </Card.Body>
//                </Card>
//             </Col>
//          </Row>
//       </div>
//    )
// }

// export default Statistics

import React, { useState } from 'react'
import { Row, Col, Card, Table, Form } from 'react-bootstrap'
import styles from '../../../styles/components/admin/admin-common.module.css'

const Statistics = () => {
   const [selectedPeriod, setSelectedPeriod] = useState('week')

   // 통계 데이터 (실제로는 API에서 가져올 예정)
   const stats = {
      week: {
         visitors: { current: 8743, previous: 7892, change: 10.8 },
         pageViews: { current: 34567, previous: 31244, change: 10.6 },
         newUsers: { current: 234, previous: 198, change: 18.2 },
         posts: { current: 89, previous: 76, change: 17.1 },
         comments: { current: 456, previous: 423, change: 7.8 },
         reports: { current: 12, previous: 8, change: 50.0 },
      },
      month: {
         visitors: { current: 42356, previous: 38901, change: 8.9 },
         pageViews: { current: 167890, previous: 154321, change: 8.8 },
         newUsers: { current: 1245, previous: 1089, change: 14.3 },
         posts: { current: 567, previous: 489, change: 15.9 },
         comments: { current: 2134, previous: 1876, change: 13.8 },
         reports: { current: 45, previous: 38, change: 18.4 },
      },
      year: {
         visitors: { current: 523456, previous: 456789, change: 14.6 },
         pageViews: { current: 2045678, previous: 1789234, change: 14.3 },
         newUsers: { current: 15420, previous: 12876, change: 19.8 },
         posts: { current: 8764, previous: 7234, change: 21.1 },
         comments: { current: 23451, previous: 18976, change: 23.6 },
         reports: { current: 234, previous: 198, change: 18.2 },
      },
   }

   // 인기 게시글 통계
   const popularPosts = [
      { title: '비트코인 급등, 이번엔 진짜일까?', views: 12470, comments: 234, likes: 1560 },
      { title: '이더리움 2.0 업데이트 완료 소식', views: 8920, comments: 156, likes: 980 },
      { title: '알트코인 시즌이 올까? 주요 지표 분석', views: 7560, comments: 189, likes: 890 },
      { title: 'DeFi 프로토콜 해킹 사건 분석', views: 6430, comments: 123, likes: 670 },
      { title: 'NFT 시장 동향과 향후 전망', views: 5890, comments: 98, likes: 560 },
   ]

   // 활성 사용자 통계
   const activeUsers = [
      { nickname: '크립토분석가', posts: 45, comments: 234, points: 15750 },
      { nickname: '블록체인전문가', posts: 38, comments: 189, points: 12890 },
      { nickname: '투자전략가', posts: 32, comments: 156, points: 10560 },
      { nickname: 'NFT컬렉터', posts: 28, comments: 145, points: 9870 },
      { nickname: '암호화폐매니아', posts: 25, comments: 134, points: 8920 },
   ]

   const currentStats = stats[selectedPeriod]

   const renderStatCard = (title, current, previous, change, icon, colorClass) => (
      <Col lg={4} md={2} sm={6} className="mb-4">
         <Card className={styles.dashboardCard}>
            <Card.Body className="text-center">
               <div className={`${styles.cardIcon} ${styles[colorClass]} mx-auto`}>
                  <i className={icon}></i>
               </div>
               <h4 className={styles.cardNumber}>{current.toLocaleString()}</h4>
               <p className={styles.cardLabel}>{title}</p>
               <div className={`${styles.cardChange} ${change > 0 ? styles.changePositive : styles.changeNegative}`}>
                  <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'}`}></i>
                  {Math.abs(change).toFixed(1)}%
               </div>
               <small className="text-muted">이전: {previous.toLocaleString()}</small>
            </Card.Body>
         </Card>
      </Col>
   )

   const getPeriodLabel = () => {
      switch (selectedPeriod) {
         case 'week':
            return '이번 주'
         case 'month':
            return '이번 달'
         case 'year':
            return '올해'
         default:
            return ''
      }
   }

   return (
      <div>
         {/* 기간 선택 */}
         <Card className={styles.contentCard}>
            <Card.Body>
               <Row className="align-items-center">
                  <Col>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-chart-bar me-2"></i>
                        통계 대시보드 - {getPeriodLabel()}
                     </h4>
                  </Col>
                  <Col md="auto">
                     <Form.Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} style={{ width: '150px' }}>
                        <option value="week">주간</option>
                        <option value="month">월간</option>
                        <option value="year">연간</option>
                     </Form.Select>
                  </Col>
               </Row>
            </Card.Body>
         </Card>

         {/* 주요 통계 카드들 */}
         <Row>
            {renderStatCard('방문자', currentStats.visitors.current, currentStats.visitors.previous, currentStats.visitors.change, 'fas fa-users', 'iconPrimary')}
            {renderStatCard('페이지뷰', currentStats.pageViews.current, currentStats.pageViews.previous, currentStats.pageViews.change, 'fas fa-eye', 'iconSuccess')}
            {renderStatCard('신규가입', currentStats.newUsers.current, currentStats.newUsers.previous, currentStats.newUsers.change, 'fas fa-user-plus', 'iconInfo')}
            {renderStatCard('게시글', currentStats.posts.current, currentStats.posts.previous, currentStats.posts.change, 'fas fa-file-alt', 'iconWarning')}
            {renderStatCard('댓글', currentStats.comments.current, currentStats.comments.previous, currentStats.comments.change, 'fas fa-comments', 'iconSuccess')}
            {renderStatCard('신고', currentStats.reports.current, currentStats.reports.previous, currentStats.reports.change, 'fas fa-flag', 'iconDanger')}
         </Row>

         {/* 상세 통계 */}
         <Row>
            {/* 인기 게시글 */}
            <Col lg={12} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-fire me-2"></i>
                        인기 게시글 TOP 5
                     </h4>
                  </div>
                  <Card.Body className="p-0">
                     <Table responsive className={styles.adminTable}>
                        <thead>
                           <tr>
                              <th>순위</th>
                              <th>제목</th>
                              <th>조회수</th>
                              <th>댓글</th>
                              <th>추천</th>
                           </tr>
                        </thead>
                        <tbody>
                           {popularPosts.map((post, index) => (
                              <tr key={index}>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <div className={`badge ${index < 3 ? 'bg-warning' : 'bg-secondary'} me-2`}>{index + 1}</div>
                                       {index === 0 && <i className="fas fa-crown text-warning"></i>}
                                    </div>
                                 </td>
                                 <td>
                                    <div title={post.title}>{post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}</div>
                                 </td>
                                 <td>{post.views.toLocaleString()}</td>
                                 <td>{post.comments}</td>
                                 <td>{post.likes}</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Card.Body>
               </Card>
            </Col>

            {/* 활성 사용자 */}
            <Col lg={12} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-medal me-2"></i>
                        활성 사용자 TOP 5
                     </h4>
                  </div>
                  <Card.Body className="p-0">
                     <Table responsive className={styles.adminTable}>
                        <thead>
                           <tr>
                              <th>순위</th>
                              <th>닉네임</th>
                              <th>게시글</th>
                              <th>댓글</th>
                              <th>포인트</th>
                           </tr>
                        </thead>
                        <tbody>
                           {activeUsers.map((user, index) => (
                              <tr key={index}>
                                 <td>
                                    <div className="d-flex align-items-center">
                                       <div className={`badge ${index < 3 ? 'bg-primary' : 'bg-secondary'} me-2`}>{index + 1}</div>
                                       {index === 0 && <i className="fas fa-star text-warning"></i>}
                                    </div>
                                 </td>
                                 <td>
                                    <strong>{user.nickname}</strong>
                                 </td>
                                 <td>{user.posts}</td>
                                 <td>{user.comments}</td>
                                 <td>{user.points.toLocaleString()}P</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Card.Body>
               </Card>
            </Col>
         </Row>

         {/* 카테고리별 통계 */}
         <Row>
            <Col lg={6} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-chart-pie me-2"></i>
                        카테고리별 게시글 분포
                     </h4>
                  </div>
                  <Card.Body>
                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>비트코인</span>
                           <strong>2,543개 (35%)</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-warning" style={{ width: '35%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>이더리움</span>
                           <strong>1,876개 (26%)</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-info" style={{ width: '26%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>일반토론</span>
                           <strong>1,432개 (20%)</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-secondary" style={{ width: '20%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>리플</span>
                           <strong>987개 (14%)</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-primary" style={{ width: '14%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>NFT</span>
                           <strong>356개 (5%)</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-success" style={{ width: '5%' }}></div>
                        </div>
                     </div>
                  </Card.Body>
               </Card>
            </Col>

            <Col lg={6} className="mb-4">
               <Card className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                     <h4 className={styles.cardTitle}>
                        <i className="fas fa-clock me-2"></i>
                        시간대별 활동 분포
                     </h4>
                  </div>
                  <Card.Body>
                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>00:00 - 06:00</span>
                           <strong>8%</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-secondary" style={{ width: '8%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>06:00 - 12:00</span>
                           <strong>22%</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-info" style={{ width: '22%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>12:00 - 18:00</span>
                           <strong>35%</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-success" style={{ width: '35%' }}></div>
                        </div>
                     </div>

                     <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                           <span>18:00 - 24:00</span>
                           <strong>35%</strong>
                        </div>
                        <div className="progress mb-3">
                           <div className="progress-bar bg-primary" style={{ width: '35%' }}></div>
                        </div>
                     </div>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default Statistics
