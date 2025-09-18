import { Link } from 'react-router-dom'
import { TrendingUp, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import styles from '../../../styles/components/common/Footer.module.css'

const Footer = () => {
   return (
      <footer className={styles.footer}>
         <div className="container">
            <div className={styles.footerContent}>
               <div className={styles.footerSection}>
                  <div className={styles.footerLogo}>
                     <TrendingUp size={32} />
                     <span>STOCKLOUNGE</span>
                  </div>
                  <p className={styles.footerDescription}>실시간 코인 차트와 최신 뉴스를 제공하는 신뢰할 수 있는 투자 정보 플랫폼입니다.</p>
                  <div className={styles.socialLinks}>
                     <a href="#" className={styles.socialLink} aria-label="Twitter">
                        <Twitter size={20} />
                     </a>
                     <a href="#" className={styles.socialLink} aria-label="Instagram">
                        <Instagram size={20} />
                     </a>
                     <a href="#" className={styles.socialLink} aria-label="Youtube">
                        <Youtube size={20} />
                     </a>
                     <a href="#" className={styles.socialLink} aria-label="Email">
                        <Mail size={20} />
                     </a>
                  </div>
               </div>

               <div className={styles.footerSection}>
                  <h4 className={styles.footerTitle}>서비스</h4>
                  <ul className={styles.footerLinks}>
                     <li>
                        <Link to="/markets">코인 차트</Link>
                     </li>
                     <li>
                        <Link to="/news">최신 뉴스</Link>
                     </li>
                     <li>
                        <Link to="/community">커뮤니티</Link>
                     </li>
                     <li>
                        <Link to="/rewards">리워드</Link>
                     </li>
                  </ul>
               </div>

               <div className={styles.footerSection}>
                  <h4 className={styles.footerTitle}>고객지원</h4>
                  <ul className={styles.footerLinks}>
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

               <div className={styles.footerSection}>
                  <h4 className={styles.footerTitle}>회사 정보</h4>
                  <ul className={styles.footerLinks}>
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

            <div className={styles.footerBottom}>
               <div className={styles.footerInfo}>
                  <p>© {new Date().getFullYear()} STOCKLOUNGE. All rights reserved.</p>
                  <p>투자에 대한 책임은 투자자 본인에게 있으며, 투자 결정은 신중하게 하시기 바랍니다.</p>
               </div>
               <div className={styles.footerContact}>
                  <p>이메일: support@stocklounge.com</p>
                  <p>고객센터: 02-1234-5678</p>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
