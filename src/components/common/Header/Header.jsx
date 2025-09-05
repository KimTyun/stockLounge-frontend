import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import LoginModal from '../../auth/LoginModal';
import styles from '../../../styles/components/common/Header.module.css';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Navbar 
        bg="light" 
        expand="lg" 
        fixed="top" 
        className={styles.navbar}
        style={{ backgroundColor: '#F7FAFC' }}
      >
        <Container>
          <Navbar.Brand href="/" className={styles.brand}>
            StockRounge
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">메인</Nav.Link>
              <Nav.Link href="/board">게시판</Nav.Link>
              <Nav.Link href="/chart">차트</Nav.Link>
              <Nav.Link href="/news">뉴스</Nav.Link>
              <Nav.Link href="/user">내정보</Nav.Link>
            </Nav>
            
            <Nav>
              {!isLoggedIn ? (
                <div className={styles.authButtons}>
                  <Button 
                    variant="outline-primary" 
                    className={styles.loginBtn}
                    onClick={handleLoginClick}
                  >
                    로그인
                  </Button>
                  <Button 
                    variant="primary" 
                    className={styles.registerBtn}
                    style={{ backgroundColor: '#5E94CA', borderColor: '#5E94CA' }}
                  >
                    회원가입
                  </Button>
                </div>
              ) : (
                <div className={styles.userInfo}>
                  <img 
                    src="/default-profile.png" 
                    alt="프로필" 
                    className={styles.profileImage}
                  />
                  <span className={styles.nickname}>사용자닉네임</span>
                  <i className={styles.notificationIcon}>🔔</i>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal 
        show={showLoginModal} 
        onHide={handleCloseModal}
        onLogin={() => setIsLoggedIn(true)}
      />
    </>
  );
};

export default Header;
