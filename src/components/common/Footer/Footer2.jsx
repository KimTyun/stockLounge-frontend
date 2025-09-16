import { Link } from 'react-router-dom'
import { TrendingUp, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import '../../../styles/components/common/Footer2.css'
import { ROUTES } from '../../../config/routes'

const Footer = () => {
   return (
      <footer className="footer">
         <div className="container-fluid">
            <div className="footer-content">
               {/* 브랜드 섹션 */}
               <div className="footer-section">
                  <div className="footer-logo">
                     <TrendingUp size={32} />
                     <span>STOCKLOUNGE</span>
                  </div>
                  <p className="footer-description">실시간 코인 차트와 최신 뉴스를 제공하는 신뢰할 수 있는 투자 정보 플랫폼입니다.</p>
                  <div className="social-links">
                     <a href="#" className="social-link" aria-label="Twitter">
                        <Twitter size={20} />
                     </a>
                     <a href="#" className="social-link" aria-label="Instagram">
                        <Instagram size={20} />
                     </a>
                     <a href="#" className="social-link" aria-label="Youtube">
                        <Youtube size={20} />
                     </a>
                     <a href="#" className="social-link" aria-label="Email">
                        <Mail size={20} />
                     </a>
                  </div>
               </div>

               {/* 서비스 링크 */}
               <div className="footer-section">
                  <h4 className="footer-title">서비스</h4>
                  <ul className="footer-links">
                     <li>
                        <Link to={ROUTES.CHART}>코인 차트</Link>
                     </li>
                     <li>
                        <Link to={ROUTES.NEWS}>최신 뉴스</Link>
                     </li>
                     <li>
                        <Link to={ROUTES.BOARD}>커뮤니티</Link>
                     </li>
                     <li>
                        <Link to="/rewards">리워드</Link>
                     </li>
                  </ul>
               </div>

               {/* 고객지원 */}
               <div className="footer-section">
                  <h4 className="footer-title">고객지원</h4>
                  <ul className="footer-links">
                     <li>
                        <Link to="/faq">자주 묻는 질문</Link>
                     </li>
                     <li>
                        <Link to="/contact">1:1 문의하기</Link>
                     </li>
                     <li>
                        <Link to="/terms">이용약관</Link>
                     </li>
                     <li>
                        <Link to="/privacy">개인정보처리방침</Link>
                     </li>
                  </ul>
               </div>

               {/* 투자정보 */}
               <div className="footer-section">
                  <h4 className="footer-title">투자정보</h4>
                  <ul className="footer-links">
                     <li>
                        <Link to="/about">회사소개</Link>
                     </li>
                     <li>
                        <Link to="/careers">채용정보</Link>
                     </li>
                     <li>
                        <Link to="/press">보도자료</Link>
                     </li>
                     <li>
                        <Link to="/api">API 문서</Link>
                     </li>
                  </ul>
               </div>
            </div>

            {/* 하단 정보 */}
            <div className="footer-bottom">
               <div className="footer-info">
                  <p>© 2025 STOCKLOUNGE. All rights reserved.</p>
                  <p>투자에 대한 책임은 투자자 본인에게 있으며, 투자 결정은 신중하게 하시기 바랍니다.</p>
               </div>
               <div className="footer-contact">
                  <p>이메일: support@stocklounge.com</p>
                  <p>고객센터: 02-1234-5678</p>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
