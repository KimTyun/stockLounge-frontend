import React, { useState } from 'react'
import { Container, Row, Col, Nav, Tab, Card } from 'react-bootstrap'
import Dashboard from '../../components/admin/Dashboard'
import UserManagement from '../../components/admin/UserManagement'
import BoardManagement from '../../components/admin/BoardManagement'
import SiteManagement from '../../components/admin/SiteManagement'
import Statistics from '../../components/admin/Statistics'
import styles from '../../styles/pages/Admin.module.css'

const Admin = () => {
   const [activeTab, setActiveTab] = useState('dashboard')

   // 관리자 권한 체크 임시로 true 설정
   const isAdmin = true

   if (!isAdmin) {
      return (
         <div className={styles.accessDenied}>
            <Container>
               <Row className="justify-content-center">
                  <Col md={6} className="text-center">
                     <h2>접근 권한이 없습니다</h2>
                     <p>관리자만 접근할 수 있는 페이지입니다.</p>
                  </Col>
               </Row>
            </Container>
         </div>
      )
   }

   const renderTabContent = () => {
      switch (activeTab) {
         case 'dashboard':
            return <Dashboard />
         case 'users':
            return <UserManagement />
         case 'boards':
            return <BoardManagement />
         case 'site':
            return <SiteManagement />
         case 'statistics':
            return <Statistics />
         default:
            return <Dashboard />
      }
   }

   return (
      <div className={styles.admin}>
         <Container fluid>
            <div className={styles.adminHeader}>
               <h1>관리자 대시보드</h1>
               <p>StockRounge 관리 시스템</p>
            </div>

            <Row>
               <Col lg={2} className={styles.sidebar}>
                  <Nav variant="pills" className={`flex-column ${styles.adminNav}`}>
                     <Nav.Item>
                        <Nav.Link className={`${styles.navLink} ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                           <i className="fas fa-tachometer-alt"></i>
                           대시보드
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link className={`${styles.navLink} ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                           <i className="fas fa-users"></i>
                           회원 관리
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link className={`${styles.navLink} ${activeTab === 'boards' ? 'active' : ''}`} onClick={() => setActiveTab('boards')}>
                           <i className="fas fa-clipboard-list"></i>
                           게시판 관리
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link className={`${styles.navLink} ${activeTab === 'site' ? 'active' : ''}`} onClick={() => setActiveTab('site')}>
                           <i className="fas fa-cog"></i>
                           사이트 관리
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link className={`${styles.navLink} ${activeTab === 'statistics' ? 'active' : ''}`} onClick={() => setActiveTab('statistics')}>
                           <i className="fas fa-chart-bar"></i>
                           통계
                        </Nav.Link>
                     </Nav.Item>
                  </Nav>
               </Col>

               <Col lg={10} className={styles.mainContent}>
                  {renderTabContent()}
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default Admin
