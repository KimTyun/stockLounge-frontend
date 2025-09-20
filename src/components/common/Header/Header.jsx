import { useState, useEffect, useRef } from 'react'
import { Navbar, Nav, Container, Button, Toast } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import styles from '../../../styles/components/common/Header.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { logoutThunk } from '../../../features/authSlice'
import { getMeThunk } from '../../../features/userSlice'

const Header = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const auth = useSelector((state) => state.auth)
   const { user: userFromUserSlice } = useSelector((state) => state.user)
   const isLoggedIn = Boolean(auth?.isLoggedIn)
   const user = userFromUserSlice || auth?.user
   const [mobileOpen, setMobileOpen] = useState(false)
   const [showProfileMenu, setShowProfileMenu] = useState(false)
   const [showLoginToast, setShowLoginToast] = useState(false)
   const prevIsLoggedIn = useRef(isLoggedIn)

   const handleLoginClick = () => {
      navigate(ROUTES.LOGIN)
      setMobileOpen(false)
   }

   const handleLogout = async () => {
      try {
         await dispatch(logoutThunk()).unwrap()
      } catch (error) {
         console.error('Logout failed:', error)
      }
      setMobileOpen(false)
      navigate(ROUTES.HOME)
   }

   useEffect(() => {
      if (!prevIsLoggedIn.current && isLoggedIn) {
         setShowLoginToast(true)
         setTimeout(() => setShowLoginToast(false), 3000)
      }
      prevIsLoggedIn.current = isLoggedIn
   }, [isLoggedIn])

   // 로그인 상태일 때 사용자 정보 가져오기
   useEffect(() => {
      if (isLoggedIn && !userFromUserSlice) {
         dispatch(getMeThunk()).catch(() => {})
      }
   }, [isLoggedIn, userFromUserSlice, dispatch])

   return (
      <>
         <Navbar variant="dark" expand="lg" fixed="top" className={`${styles.navbar} ${styles.navbarGradient} ${styles.desktopNavWrapper}`}>
            <Container className={styles.navInner}>
               <Navbar.Brand as={NavLink} to={ROUTES.HOME} className={styles.brand}>
                  STOCKLOUNGE
               </Navbar.Brand>

               <button className={styles.hamburger} aria-label="메뉴" onClick={() => setMobileOpen((s) => !s)}>
                  <span className={styles.hamburgerBar} />
                  <span className={styles.hamburgerBar} />
                  <span className={styles.hamburgerBar} />
               </button>
               <div className={styles.desktopNav}>
                  <Nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                     <Nav.Link as={NavLink} to={ROUTES.MAIN} className={styles.navItem}>
                        메인
                     </Nav.Link>

                     <Nav.Link as={NavLink} to={ROUTES.BOARD} className={styles.navItem}>
                        게시판
                     </Nav.Link>
                     <Nav.Link as={NavLink} to={ROUTES.CHART} className={styles.navItem}>
                        차트
                     </Nav.Link>
                     <Nav.Link as={NavLink} to={ROUTES.NEWS} className={styles.navItem}>
                        뉴스
                     </Nav.Link>
                     <Nav.Link as={NavLink} to={ROUTES.USER_INFO} className={styles.navItem}>
                        내정보
                     </Nav.Link>
                  </Nav>

                  <div className={styles.authArea}>
                     {!isLoggedIn ? (
                        <div className={styles.authButtons}>
                           <button className={`${styles.iconBtn} ${styles.loginIconBtn}`} onClick={handleLoginClick} aria-label="로그인">
                              <i className="fa-solid fa-right-to-bracket" aria-hidden style={{ fontSize: 18 }}></i>
                           </button>

                           <NavLink to={ROUTES.REGISTER} className={`${styles.iconBtn} ${styles.registerIconBtn}`} aria-label="회원가입">
                              <i className="fa-solid fa-user-plus" aria-hidden style={{ fontSize: 18 }}></i>
                           </NavLink>
                        </div>
                     ) : (
                        <div className={styles.userInfo}>
                           <div className={styles.profileWrap}>
                              <img 
                                 src={
                                    user?.profile_img
                                       ? user.profile_img.startsWith('http')
                                          ? user.profile_img
                                          : `${import.meta.env.VITE_API_URL}${user.profile_img}`
                                       : '/default-profile.png'
                                 } 
                                 alt="프로필" 
                                 className={styles.profileImage} 
                                 onClick={() => setShowProfileMenu((s) => !s)}
                                 onError={(e) => {
                                    e.target.src = '/default-profile.png'
                                 }}
                              />
                              <span className={styles.nickname}>{user?.nickname || '사용자'}</span>
                              {showProfileMenu && (
                                 <div className={styles.profileDropdown}>
                                    <Button variant="link" as={NavLink} to={ROUTES.USER_INFO} onClick={() => setShowProfileMenu(false)}>
                                       내 정보
                                    </Button>
                                    <Button variant="link" onClick={handleLogout}>
                                       로그아웃
                                    </Button>
                                 </div>
                              )}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </Container>

            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
               <nav className={styles.mobileNav}>
                  <a
                     onClick={() => {
                        setMobileOpen(false)
                        navigate(ROUTES.MAIN)
                     }}
                     className={styles.mobileLink}
                  >
                     메인
                  </a>
                  <a
                     onClick={() => {
                        setMobileOpen(false)
                        navigate(ROUTES.BOARD)
                     }}
                     className={styles.mobileLink}
                  >
                     게시판
                  </a>
                  <a
                     onClick={() => {
                        setMobileOpen(false)
                        navigate(ROUTES.CHART)
                     }}
                     className={styles.mobileLink}
                  >
                     차트
                  </a>
                  <a
                     onClick={() => {
                        setMobileOpen(false)
                        navigate(ROUTES.NEWS)
                     }}
                     className={styles.mobileLink}
                  >
                     뉴스
                  </a>
                  <a
                     onClick={() => {
                        setMobileOpen(false)
                        navigate(ROUTES.USER_INFO)
                     }}
                     className={styles.mobileLink}
                  >
                     내정보
                  </a>

                  <div className={styles.mobileAuthArea}>
                     {!isLoggedIn ? (
                        <>
                           <button
                              className={`${styles.iconBtn} ${styles.loginIconBtn}`}
                              onClick={() => {
                                 handleLoginClick()
                                 setMobileOpen(false)
                              }}
                              aria-label="로그인"
                           >
                              <i className="fa-solid fa-right-to-bracket" aria-hidden style={{ fontSize: 18 }}></i>
                           </button>
                           <NavLink to={ROUTES.REGISTER} className={`${styles.iconBtn} ${styles.registerIconBtn}`} onClick={() => setMobileOpen(false)} aria-label="회원가입">
                              <i className="fa-solid fa-user-plus" aria-hidden style={{ fontSize: 18 }}></i>
                           </NavLink>
                        </>
                     ) : (
                        <>
                           <div className={styles.userInfoMobile}>
                              <img 
                                 src={
                                    user?.profile_img
                                       ? user.profile_img.startsWith('http')
                                          ? user.profile_img
                                          : `${import.meta.env.VITE_API_URL}${user.profile_img}`
                                       : '/default-profile.png'
                                 } 
                                 alt="프로필" 
                                 className={styles.profileImage}
                                 onError={(e) => {
                                    e.target.src = '/default-profile.png'
                                 }}
                              />
                              <div>
                                 <div className={styles.nickname}>{user?.nickname || '사용자'}</div>
                                 <Button variant="link" className={styles.logoutBtn} onClick={handleLogout}>
                                    로그아웃
                                 </Button>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               </nav>
            </div>
         </Navbar>
         <div className={styles.toastContainer} aria-live="polite" aria-atomic="true">
            <Toast onClose={() => setShowLoginToast(false)} show={showLoginToast} delay={3000} autohide>
               <Toast.Header>
                  <strong className="me-auto">STOCKLOUNGE</strong>
               </Toast.Header>
               <Toast.Body>로그인되었습니다.</Toast.Body>
            </Toast>
         </div>
      </>
   )
}

export default Header
