import React, { useMemo, useState } from 'react'
import { Card, Row, Col, Image, Button, Badge, Table, Pagination } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'

const InfoTab = ({ userData, pointHistory, totalpage }) => {
   const [activePage, setActivePage] = useState(1)

   const handlePage = (pageNumber) => {
      return () => {
         if (pageNumber < 1 || pageNumber > totalpage) return
         setActivePage(pageNumber)
      }
   }

   const pageItems = useMemo(() => {
      const items = []
      items.push(
         <Pagination.Item key={1} active={1 === activePage} onClick={handlePage(1)}>
            1
         </Pagination.Item>
      )
      if (activePage > 4) {
         items.push(<Pagination.Ellipsis key="start-ellipsis" disabled></Pagination.Ellipsis>)
      }

      const start = Math.max(2, activePage - 2)
      const end = Math.min(totalpage - 1, activePage + 2)

      for (let number = start; number <= end; number++) {
         items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={handlePage(number)}>
               {number}
            </Pagination.Item>
         )
      }
      if (activePage < totalpage - 3) {
         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />)
      }
      items.push(
         <Pagination.Item key={totalpage} active={totalpage === activePage} onClick={handlePage(totalpage)}>
            {totalpage}
         </Pagination.Item>
      )

      return items
   }, [activePage, totalpage])

   return (
      <>
         <Card className={styles.contentCard}>
            <Card.Body className={styles.profileSection}>
               <Row>
                  <Col md={4} className="text-center">
                     <div className={styles.profileImageSection}>
                        <Image
                           src={userData.profileImage}
                           roundedCircle
                           className={styles.profileImage}
                           onError={(e) => {
                              e.target.src =
                                 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI3NSIgY3k9Ijc1IiByPSI3NSIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZmlsZTwvdGV4dD4KPC9zdmc+'
                           }}
                        />
                        <div className={styles.profileActions}>
                           <Button variant="outline-primary" size="sm" className={styles.changePhotoBtn}>
                              사진 변경
                           </Button>
                        </div>
                     </div>
                  </Col>
                  <Col md={8}>
                     <div className={styles.profileInfo}>
                        <h3 className={styles.nickname}>{userData.nickname}</h3>
                        <div className={styles.userDetails}>
                           <div className={styles.detailItem}>
                              <strong>이름:</strong> {userData.name}
                           </div>
                           <div className={styles.detailItem}>
                              <strong>이메일:</strong> {userData.email}
                           </div>
                           <div className={styles.detailItem}>
                              <strong>가입일:</strong> {userData.joinDate}
                           </div>
                           <div className={styles.detailItem}>
                              <strong>등급:</strong>
                              <Badge variant="secondary" className={styles.accountBadge}>
                                 {userData.tier}
                              </Badge>
                              다음 등급까지 {100}p
                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>
               <hr />
               <Row>
                  <Col md={6}>
                     <Card className={styles.pointCard}>
                        <Card.Body className="text-center">
                           <h5>누적 획득 포인트</h5>
                           <span className={styles.totalPoints}>{userData.totalPoints.toLocaleString()}P</span>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={6}>
                     <Card className={styles.pointCard}>
                        <Card.Body className="text-center">
                           <h5>현재 보유 포인트</h5>
                           <span className={styles.currentPoints}>{userData.currentPoints.toLocaleString()}P</span>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
               <hr />
               <Card className={styles.contentCard}>
                  <Card.Header>
                     <h4>포인트 내역</h4>
                  </Card.Header>
                  <Card.Body className={styles.historyBody}>
                     <Table responsive className={`${styles.historyTable} ${styles.pointHistory}`}>
                        <colgroup>
                           <col />
                           <col />
                           <col />
                           <col />
                        </colgroup>
                        <thead>
                           <tr>
                              <th>구분</th>
                              <th>내용</th>
                              <th>포인트</th>
                              <th>일시</th>
                           </tr>
                        </thead>
                        <tbody>
                           {pointHistory.map((history) => (
                              <tr key={history.id}>
                                 <td>
                                    <Badge bg={history.type === '획득' ? 'success' : 'danger'} className={styles.typeBadge}>
                                       {history.type}
                                    </Badge>
                                 </td>
                                 <td className={styles.tdwrap}>{history.action}</td>
                                 <td className={history.type === '획득' ? styles.gainPoints : styles.lossPoints}>{history.points}</td>
                                 <td className={styles.historyDate}>{history.date}</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Card.Body>

                  <Pagination className="pagination-sm justify-content-center">
                     <Pagination.First onClick={handlePage(1)} />
                     <Pagination.Prev onClick={handlePage(activePage - 1)} className={styles.smallPagenation} />
                     {pageItems}
                     <Pagination.Next onClick={handlePage(activePage + 1)} className={styles.smallPagenation} />
                     <Pagination.Last onClick={handlePage(totalpage)} />
                  </Pagination>
               </Card>
            </Card.Body>
         </Card>
      </>
   )
}

export default InfoTab
