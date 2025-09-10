import { useState } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'
import InfoTab from './InfoTab'
import EditTab from './EditTab'
import ExchangeTab from './ExchangeTab'
import PostTab from './PostTab'

const User = () => {
   const [activeTab, setActiveTab] = useState('info')

   // 임시 사용자 데이터
   const userData = {
      profileImage: '/api/placeholder/150/150',
      nickname: '크립토매니아',
      name: '홍길동',
      email: 'crypto@example.com',
      joinDate: '2024-03-15',
      totalPoints: 15750,
      currentPoints: 8250,
      phoneNumber: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: '456호',
      secondaryPassword: '설정됨',
      tier: ['Bronze'],
   }

   // 포인트 내역 데이터
   const pointHistory = [
      { id: 1, type: '획득', action: '게시글 잔뜩길어져서 보기흉한 무언가를 작성하는 중에 일어난 무언가의 압박 작성', points: '+10', date: '2025-09-04 14:30' },
      { id: 2, type: '획득', action: '댓글 추천받음', points: '+1', date: '2025-09-04 13:15' },
      { id: 3, type: '사용', action: '스타벅스 기프티콘 교환', points: '-5000', date: '2025-09-03 16:20' },
      { id: 4, type: '획득', action: '게시글 추천받음', points: '+1', date: '2025-09-03 12:45' },
      { id: 5, type: '획득', action: '댓글 작성', points: '+5', date: '2025-09-03 11:30' },
      { id: 6, type: '사용', action: '코인 교환', points: '-1000', date: '2025-09-02 19:15' },
      { id: 7, type: '획득', action: '게시글 작성', points: '+10', date: '2025-09-02 15:20' },
      { id: 8, type: '획득', action: '댓글 추천받음', points: '+1', date: '2025-09-02 10:10' },
   ]

   // 교환 가능한 상품 데이터
   const exchangeItems = [
      {
         id: 1,
         type: 'coin',
         name: 'StockRounge 코인',
         description: '1000포인트 = 1코인',
         requiredPoints: 1000,
         image: '/api/placeholder/100/100',
         category: 'coin',
      },
      {
         id: 2,
         type: 'gift',
         name: '스타벅스 아메리카노',
         description: '스타벅스 아메리카노 기프티콘',
         requiredPoints: 5000,
         image: '/api/placeholder/100/100',
         category: 'gift',
      },
      {
         id: 3,
         type: 'gift',
         name: '치킨 기프티콘',
         description: 'BBQ 황금올리브 기프티콘',
         requiredPoints: 20000,
         image: '/api/placeholder/100/100',
         category: 'gift',
      },
      {
         id: 4,
         type: 'gift',
         name: '문화상품권 1만원',
         description: '온라인 문화상품권',
         requiredPoints: 12000,
         image: '/api/placeholder/100/100',
         category: 'gift',
      },
      {
         id: 5,
         type: 'gift',
         name: 'CGV 영화관람권',
         description: 'CGV 영화관람권',
         requiredPoints: 15000,
         image: '/api/placeholder/100/100',
         category: 'gift',
      },
      {
         id: 6,
         type: 'gift',
         name: '아마존 기프트카드',
         description: '아마존 10달러 기프트카드',
         requiredPoints: 18000,
         image: '/api/placeholder/100/100',
         category: 'gift',
      },
   ]

   return (
      <div className={styles.user}>
         <Container>
            <Row>
               <Col>
                  <div className={styles.userHeader}>
                     <h2>내 정보</h2>
                     <Nav variant="tabs" className={styles.userTabs}>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'info'} onClick={() => setActiveTab('info')} className={styles.tabLink}>
                              내 정보 홈
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'edit'} onClick={() => setActiveTab('edit')} className={styles.tabLink}>
                              내 정보 수정
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'post'} onClick={() => setActiveTab('post')} className={styles.tabLink}>
                              작성글 관리
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'exchange'} onClick={() => setActiveTab('exchange')} className={styles.tabLink}>
                              포인트 교환
                           </Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </div>
               </Col>
            </Row>

            <Row>
               <Col>
                  <div className={styles.userContent}>
                     {activeTab === 'info' && <InfoTab userData={userData} pointHistory={pointHistory} totalpage={100} />}
                     {activeTab === 'edit' && <EditTab userData={userData} />}
                     {activeTab === 'exchange' && <ExchangeTab userData={userData} exchangeItems={exchangeItems} />}
                     {activeTab === 'post' && <PostTab postPage={50} commentPage={80} posts={pointHistory} comments={pointHistory} />}
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default User
