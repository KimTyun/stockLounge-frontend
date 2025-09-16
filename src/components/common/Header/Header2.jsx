import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, X, User, TrendingUp } from 'lucide-react'
import './Header.css'

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [searchQuery, setSearchQuery] = useState('')
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

   return (
      <header className="header">
         <div className="container">
            <div className="header-content">
               {/* 로고 */}
               <Link to="/" className="logo">
                  <TrendingUp size={28} />
                  <span>STOCKLOUNGE</span>
               </Link>

               {/* 네비게이션 (데스크톱) */}
               <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                  <Link to="/" className="nav-link">
                     홈
                  </Link>
                  <Link to="/markets" className="nav-link">
                     주식
                  </Link>
                  <Link to="/markets?type=crypto" className="nav-link">
                     암호화폐
                  </Link>
                  <Link to="/news" className="nav-link">
                     뉴스
                  </Link>
                  <Link to="/community" className="nav-link">
                     커뮤니티
                  </Link>
                  <Link to="/faq" className="nav-link">
                     고객지원
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
               <div className="user-menu">
                  <Link to="/profile" className="user-btn">
                     <User size={20} />
                  </Link>
                  <Link to="/rewards" className="rewards-btn">
                     <span className="coin-icon">🪙</span>
                     <span>1,500</span>
                  </Link>
               </div>

               {/* 모바일 메뉴 버튼 */}
               <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="메뉴 열기/닫기">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>

            {/* 모바일 메뉴 */}
            {isMenuOpen && (
               <div className="mobile-menu">
                  <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
                     홈
                  </Link>
                  <Link to="/markets" className="mobile-nav-link" onClick={toggleMenu}>
                     주식
                  </Link>
                  <Link to="/markets?type=crypto" className="mobile-nav-link" onClick={toggleMenu}>
                     암호화폐
                  </Link>
                  <Link to="/news" className="mobile-nav-link" onClick={toggleMenu}>
                     뉴스
                  </Link>
                  <Link to="/community" className="mobile-nav-link" onClick={toggleMenu}>
                     커뮤니티
                  </Link>
                  <Link to="/faq" className="mobile-nav-link" onClick={toggleMenu}>
                     고객지원
                  </Link>
                  <div className="mobile-user-menu">
                     <Link to="/profile" className="mobile-nav-link" onClick={toggleMenu}>
                        <User size={18} />
                        프로필
                     </Link>
                     <Link to="/rewards" className="mobile-nav-link" onClick={toggleMenu}>
                        🪙 리워드 (1,500)
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </header>
   )
}

export default Header
