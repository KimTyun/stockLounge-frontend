import { useState } from 'react'
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import LoginModal from '../../auth/LoginModal'
import styles from '../../../styles/components/common/Header.module.css'

const Header = () => {
   const [showLoginModal, setShowLoginModal] = useState(false)
   const { user, isAuthenticated, logout } = useAuth()
   const navigate = useNavigate()

   const handleLoginClick = () => {
      setShowLoginModal(true)
   }

   const handleCloseModal = () => {
      setShowLoginModal(false)
   }

   const handleLogout = async () => {
      await logout()
      navigate('/')
   }

   return (
      <>
         <Navbar bg="light" expand="lg" fixed="top" className={styles.navbar} style={{ backgroundColor: '#F7FAFC' }}>
            <Container>
               <Navbar.Brand as={Link} to="/" className={styles.brand}>
                  📈 StockLounge
               </Navbar.Brand>

               <Navbar.Toggle aria-controls="basic-navbar-nav" />

               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link as={Link} to="/">
                        메인
                     </Nav.Link>
                     <Nav.Link as={Link} to="/board">
                        게시판
                     </Nav.Link>
                     <Nav.Link as={Link} to="/chart">
                        차트
                     </Nav.Link>
                     <Nav.Link as={Link} to="/news">
                        뉴스
                     </Nav.Link>
                     {isAuthenticated && (
                        <Nav.Link as={Link} to="/user">
                           내정보
                        </Nav.Link>
                     )}
                  </Nav>

                  <Nav>
                     {!isAuthenticated ? (
                        <div className={styles.authButtons}>
                           <Button variant="outline-primary" className={styles.loginBtn} onClick={handleLoginClick}>
                              로그인
                           </Button>
                           <Button variant="primary" className={styles.registerBtn} style={{ backgroundColor: '#5E94CA', borderColor: '#5E94CA' }}>
                              회원가입
                           </Button>
                        </div>
                     ) : (
                        <div className={styles.userInfo}>
                           <Dropdown align="end">
                              <Dropdown.Toggle variant="link" className={styles.userDropdown}>
                                 <img src="/default-profile.png" alt="프로필" className={styles.profileImage} />
                                 <span className={styles.nickname}>{user?.nickname || '사용자'}</span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                 <Dropdown.Item as={Link} to="/user">
                                    내정보
                                 </Dropdown.Item>
                                 <Dropdown.Item as={Link} to="/user/posts">
                                    내 게시글
                                 </Dropdown.Item>
                                 <Dropdown.Divider />
                                 <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </div>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <LoginModal
            show={showLoginModal}
            onHide={handleCloseModal}
            onLogin={() => {
               setShowLoginModal(false)
               window.location.reload()
            }}
         />
      </>
   )
}

export default Header
