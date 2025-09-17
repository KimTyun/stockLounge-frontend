import { useEffect, useState } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import styles from '../../styles/pages/User.module.css'
import InfoTab from './InfoTab'

import ExchangeTab from './ExchangeTab'
import PostTab from './PostTab'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const User = () => {
   const [activeTab, setActiveTab] = useState('info')

   const navigate = useNavigate()
   const { isLoggedIn } = useSelector((state) => state.auth)

   //로그인 체크
   useEffect(() => {
      if (isLoggedIn === null) return

      if (!isLoggedIn) {
         navigate('/')
      }
   }, [navigate, isLoggedIn])

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
                     {activeTab === 'info' && <InfoTab />}
                     {activeTab === 'exchange' && <ExchangeTab />}
                     {activeTab === 'post' && <PostTab />}
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default User
