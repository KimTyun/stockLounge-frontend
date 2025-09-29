import { Link } from 'react-router-dom'
import { TrendingUp, BarChart3, Newspaper, Users, ArrowRight, Zap } from 'lucide-react'
import styles from '../../styles/pages/LandingPage.module.css' // CSS Modules import
import { ROUTES } from '../../config/routes'

const LandingPage = () => {
   const features = [
      { icon: <BarChart3 size={32} />, title: '실시간 차트', description: '업비트 API를 통한 실시간 코인 차트와 시세 정보를 확인하세요.' },
      { icon: <Newspaper size={32} />, title: '최신 뉴스', description: '암호화폐와 주식 관련 최신 뉴스를 빠르게 접할 수 있습니다.' },
      { icon: <Users size={32} />, title: '커뮤니티', description: '투자자들과 정보를 공유하고 의견을 나눌 수 있는 공간입니다.' },
   ]

   return (
      <div className={styles.landingPage}>
         <section className={styles.hero}>
            <div className={styles.heroBackground}>
               <div className={styles.heroPattern}></div>
            </div>
            <div className="container">
               <div className={styles.heroContent}>
                  <div className={styles.heroText}>
                     <h1 className={`${styles.heroTitle} fade-in`}>의견을 공유하여 당신의 투자력을 높이세요</h1>
                     <p className={`${styles.heroDescription} slide-up`}>STOCKLOUNGE는 실시간 암호화폐 차트와 최신 투자 뉴스, 그리고 투자자들의 소통 공간을 제공하는 종합 투자 플랫폼입니다.</p>
                     <div className={`${styles.heroButtons} slide-up`}>
                        {/* 전역 스타일과 모듈 스타일을 함께 사용: ` `(백틱) 사용 */}
                        <Link to={ROUTES.CHART} className={`btn btn-primary ${styles.btnPrimary}`}>
                           차트 보기 <ArrowRight size={20} />
                        </Link>
                        <Link to={ROUTES.BOARD} className={`btn btn-outline ${styles.btnOutline}`}>
                           커뮤니티 참여
                        </Link>
                     </div>
                  </div>
                  <div className={styles.heroVisual}>
                     <div className={styles.floatingCard}>
                        <div className={styles.miniChart}>
                           <TrendingUp size={24} className={styles.chartIcon} />
                           <div className={styles.chartData}>
                              <span className={styles.coinName}>BTC/KRW</span>
                              <span className={styles.coinPrice}>₩45,234,000</span>
                              <span className={`${styles.coinChange} ${styles.positive}`}>+2.34%</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className={`${styles.features} section`}>
            <div className="container">
               <div className="section-header text-center">
                  <h2>왜 STOCKLOUNGE을 선택해야 할까요?</h2>
                  <p>투자자들을 위한 완벽한 올인원 플랫폼</p>
               </div>
               <div className={styles.featuresGrid}>
                  {features.map((feature) => (
                     <div key={feature.title} className={`${styles.featureCard} card fade-in`}>
                        <div className={styles.featureIcon}>{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ... (인기 코인 및 최신 뉴스 섹션도 동일한 방식으로 className={styles.클래스이름} 적용) ... */}

         <section className={`${styles.cta} section`}>
            <div className="container">
               <div className={`${styles.ctaContent} text-center`}>
                  <h2>지금 바로 시작하세요</h2>
                  <p>STOCKLOUNGE와 함께 더 나은 투자 결정을 내려보세요</p>
                  <div className={styles.ctaButtons}>
                     <Link to={ROUTES.MAIN} className={`btn btn-primary ${styles.btnPrimary}`}>
                        <Zap size={20} />
                        무료로 시작하기
                     </Link>
                     <Link to={ROUTES.BOARD} className={`btn btn-outline ${styles.btnOutline}`}>
                        커뮤니티 둘러보기
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default LandingPage
