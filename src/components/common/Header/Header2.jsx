import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, User, TrendingUp } from 'lucide-react'
import '../../../styles/components/common/Header2.css'
import { ROUTES } from '../../../config/routes'
import { useAuth } from '../../../hooks/useAuth' // AuthContext 훅 임포트

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [searchQuery, setSearchQuery] = useState('')
   const { isAuthenticated, logout } = useAuth() // AuthContext에서 로그인 상태와 로그아웃 함수를 가져옵니다.
   const navigate = useNavigate()

   const handleSearch = (e) => {
      e.preventDefault()
      if (searchQuery.trim()) {
         navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
         setSearchQuery('')
      }
   }

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   const handleLogout = async (e) => {
      e.preventDefault() // a 태그의 기본 동작(페이지 이동)을 막습니다.
      await logout()
      // 로그아웃 후 홈으로 이동하고, 모바일 메뉴가 열려있었다면 닫습니다.
      navigate(ROUTES.HOME_MAIN)
      if (isMenuOpen) setIsMenuOpen(false)
   }

   return (
      // 헤더가 스크롤을 따라다니도록 sticky 속성을 추가하고, 다른 요소 위에 표시되도록 z-index를 설정합니다.
      // 배경색을 지정하여 헤더 뒤의 콘텐츠가 비치지 않도록 합니다.
      <header className="header" style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
         <div className="container-fluid">
            <div className="header-content">
               {/* 로고 */}
               <Link to={ROUTES.HOME_MAIN} className="logo">
                  <TrendingUp size={28} />
                  <span>STOCKLOUNGE</span>
               </Link>

               {/* 네비게이션 (데스크톱) */}
               <nav className={`header-main-nav ${isMenuOpen ? 'nav-open' : ''}`}>
                  <Link to={ROUTES.HOME_MAIN} className="nav-link">
                     홈
                  </Link>
                  <Link to={ROUTES.CHART} className="nav-link">
                     주식
                  </Link>
                  <Link to={ROUTES.CHART} className="nav-link">
                     암호화폐
                  </Link>
                  <Link to={ROUTES.NEWS} className="nav-link">
                     뉴스
                  </Link>
                  <Link to={ROUTES.BOARD} className="nav-link">
                     커뮤니티
                  </Link>
                  
               </nav>

               {/* 검색바 */}
               <form onSubmit={handleSearch} className="search-form">
                  <div className="search-input-wrapper">
                     <Search size={20} className="search-icon" />
                     <input type="text" placeholder="코인, 뉴스 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                  </div>
               </form>

               {/* 사용자 메뉴 */}
               <div className="header-user-menu">
                  {isAuthenticated ? (
                     <>
                        <Link to={ROUTES.USER_INFO} className="user-btn">
                           <User size={20} />
                        </Link>
                        
                        <a href="/logout" onClick={handleLogout} className="nav-link">
                           로그아웃
                        </a>
                     </>
                  ) : (
                     <>
                        <Link to="/login" className="nav-link">
                           로그인
                        </Link>
                        <Link to="/join" className="nav-link">
                           회원가입
                        </Link>
                     </>
                  )}
               </div>

               {/* 모바일 메뉴 버튼 */}
               <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="메뉴 열기/닫기">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>

            {/* 모바일 메뉴 */}
            {isMenuOpen && (
               <div className="mobile-menu">
                  <Link to={ROUTES.HOME_MAIN} className="mobile-nav-link" onClick={toggleMenu}>
                     홈
                  </Link>
                  <Link to={ROUTES.CHART} className="mobile-nav-link" onClick={toggleMenu}>
                     주식
                  </Link>
                  <Link to={ROUTES.CHART} className="mobile-nav-link" onClick={toggleMenu}>
                     암호화폐
                  </Link>
                  <Link to={ROUTES.NEWS} className="mobile-nav-link" onClick={toggleMenu}>
                     뉴스
                  </Link>
                  <Link to={ROUTES.BOARD} className="mobile-nav-link" onClick={toggleMenu}>
                     커뮤니티
                  </Link>
                  
                  <div className="mobile-user-menu">
                     {isAuthenticated ? (
                        <>
                           <Link to={ROUTES.USER_INFO} className="mobile-nav-link" onClick={toggleMenu}>
                              <User size={18} />
                              프로필
                           </Link>
                           
                           <a href="/logout" className="mobile-nav-link" onClick={handleLogout}>
                              로그아웃
                           </a>
                        </>
                     ) : (
                        <>
                           <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>
                              로그인
                           </Link>
                           <Link to="/join" className="mobile-nav-link" onClick={toggleMenu}>
                              회원가입
                           </Link>
                        </>
                     )}
                  </div>
               </div>
            )}
         </div>
      </header>
   )
}

export default Header
