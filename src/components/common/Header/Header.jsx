import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, User, TrendingUp } from 'lucide-react'
import './Header.css'
import { ROUTES } from '../../../config/routes';

const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   return (
      <header className="header">
         <div className="container">
            <div className="header-content">
               <div className="header-left">
                  {/* Logo */}
                  <NavLink to={ROUTES.HOME} className="logo">
                     <TrendingUp size={28} />
                     <span>STOCKLOUNGE</span>
                  </NavLink>
                  {/* Desktop Navigation */}
                  <nav className="nav">
                     <NavLink to={ROUTES.MAIN} className="nav-link" end>
                        Home
                     </NavLink>
                     <NavLink to={ROUTES.BOARD} className="nav-link">
                        게시판
                     </NavLink>
                     <NavLink to={ROUTES.CHART} className="nav-link">
                        차트
                     </NavLink>
                     <NavLink to={ROUTES.NEWS} className="nav-link">
                        뉴스
                     </NavLink>
                     <NavLink to={ROUTES.USER_INFO} className="nav-link">
                        내정보
                     </NavLink>
                  </nav>
               </div>
               <div className="header-right">
                  {/* User Menu */}
                  <div className="user-menu">
                     <NavLink to="/profile" className="user-btn">
                        <User size={20} />
                     </NavLink>
                     <NavLink to="/rewards" className="rewards-btn">
                        <span className="coin-icon">🪙</span>
                        <span>1,500</span>
                     </NavLink>
                  </div>
                  {/* Mobile Menu Button */}
                  <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="메뉴 열기/닫기">
                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
               <div className="mobile-menu">
                  <NavLink to={ROUTES.MAIN} className="mobile-nav-link" onClick={toggleMenu} end>
                     Home
                  </NavLink>
                  <NavLink to={ROUTES.BOARD} className="mobile-nav-link" onClick={toggleMenu}>
                     게시판
                  </NavLink>
                  <NavLink to={ROUTES.CHART} className="mobile-nav-link" onClick={toggleMenu}>
                     차트
                  </NavLink>
                  <NavLink to={ROUTES.NEWS} className="mobile-nav-link" onClick={toggleMenu}>
                     뉴스
                  </NavLink>
                  <NavLink to={ROUTES.USER_INFO} className="mobile-nav-link" onClick={toggleMenu}>
                     내정보
                  </NavLink>
                  <div className="mobile-user-menu">
                     <NavLink to="/profile" className="mobile-nav-link" onClick={toggleMenu}>
                        <User size={18} />
                        프로필
                     </NavLink>
                     <NavLink to="/rewards" className="mobile-nav-link" onClick={toggleMenu}>
                        🪙 리워드 (1,500)
                     </NavLink>
                  </div>
               </div>
            )}
         </div>
      </header>
   )
}

export default Header
