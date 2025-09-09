import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'

const ExchangeTab = ({ userData, exchangeItems }) => (
   <div>
      {/* 코인 교환 배너 */}
      <Card className={styles.coinExchangeBanner}>
         <Card.Body>
            <Row className="align-items-center">
               <Col md={8}>
                  <h3>🪙 StockRounge 코인으로 교환하세요!</h3>
                  <p>1000포인트 = 1코인으로 교환 가능합니다.</p>
                  <p>
                     현재 보유 포인트: <strong>{userData.currentPoints.toLocaleString()}P</strong>
                  </p>
               </Col>
               <Col md={4} className="text-end">
                  <Button variant="primary" size="lg" disabled={userData.currentPoints < 1000} className={styles.exchangeBtn}>
                     코인으로 교환
                  </Button>
               </Col>
            </Row>
         </Card.Body>
      </Card>
      {/* 상품 교환 목록 */}
      <h4 className={styles.sectionTitle}>상품 교환</h4>
      <Row>
         {exchangeItems
            .filter((item) => item.category === 'gift')
            .map((item) => (
               <Col md={4} key={item.id} className="mb-4">
                  <Card className={styles.exchangeCard}>
                     <div className={styles.exchangeImage}>
                        <img
                           src={item.image}
                           alt={item.name}
                           onError={(e) => {
                              e.target.src =
                                 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+R2lmdDwvdGV4dD4KPC9zdmc+'
                           }}
                        />
                     </div>
                     <Card.Body>
                        <h6 className={styles.itemName}>{item.name}</h6>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <div className={styles.pointsRequired}>
                           <strong>{item.requiredPoints.toLocaleString()}P 필요</strong>
                        </div>
                        <Button variant="primary" size="sm" disabled={userData.currentPoints < item.requiredPoints} className={styles.exchangeItemBtn} block>
                           교환하기
                        </Button>
                     </Card.Body>
                  </Card>
               </Col>
            ))}
      </Row>
   </div>
)

export default ExchangeTab
