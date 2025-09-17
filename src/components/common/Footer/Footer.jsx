import { Link } from 'react-router-dom'
import { TrendingUp, Twitter, Instagram, Youtube } from 'lucide-react'
import './Footer.css'

const Footer = () => {
   return (
      <footer className="footer">
         <div className="container">
            <div className="footer-top">
               <div className="footer-logo">
                  <TrendingUp size={28} />
                  <span>STOCKLOUNGE</span>
               </div>
               <div className="footer-links">
                  <Link to="/about">API문서</Link>
                  <Link to="/contact">고객지원</Link>
                  <Link to="/terms">사이트 이용약관</Link>
                  <Link to="/privacy">개인정보처리방침</Link>
               </div>
               <div className="social-links">
                  <a href="#" aria-label="Twitter">
                     <Twitter size={22} />
                  </a>
                  <a href="#" aria-label="Instagram">
                     <Instagram size={22} />
                  </a>
                  <a href="#" aria-label="Youtube">
                     <Youtube size={22} />
                  </a>
               </div>
            </div>
            <div className="footer-bottom">
               <p>&copy; 2025 STOCKLOUNGE. All rights reserved.</p>
               <p>투자에 대한 책임은 투자자 본인에게 있으며, 투자 결정은 신중하게 하시기 바랍니다..</p>
               <p>이메일:support@stocklounge.com</p>
               <p>고객센터: 02-1234-5678</p>
            </div>
         </div>
      </footer>
   )
}

export default Footer
