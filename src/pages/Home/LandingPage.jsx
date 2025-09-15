import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, BarChart3, Newspaper, Users, Shield, Zap, Star, ArrowRight } from 'lucide-react'
import apiService from '../../api/apiService'
import './LandingPage.css'

const LandingPage = () => {
   const [popularCoins, setPopularCoins] = useState([])
   const [latestNews, setLatestNews] = useState([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const loadData = async () => {
         try {
            // 인기 코인 정보 로드 - 데이터 연결 필요
            const coins = await apiService.getAllCoins()
            const krwCoins = coins.filter((coin) => coin.market.startsWith('KRW-')).slice(0, 6)
            setPopularCoins(krwCoins)

            // 최신 뉴스 로드 - 데이터 연결 필요
            const news = await apiService.getCryptoNews()
            setLatestNews(news.slice(0, 3))
         } catch (error) {
            console.error('Error loading data:', error)
         } finally {
            setIsLoading(false)
         }
      }

      loadData()
   }, [])

   const features = [
      {
         icon: <BarChart3 size={32} />,
         title: '실시간 차트',
         description: '업비트 API를 통한 실시간 코인 차트와 시세 정보를 확인하세요.',
      },
      {
         icon: <Newspaper size={32} />,
         title: '최신 뉴스',
         description: '암호화폐와 주식 관련 최신 뉴스를 빠르게 접할 수 있습니다.',
      },
      {
         icon: <Users size={32} />,
         title: '커뮤니티',
         description: '투자자들과 정보를 공유하고 의견을 나눌 수 있는 공간입니다.',
      },
   ]

   const testimonials = [
      {
         name: '김투자',
         role: '개인투자자',
         content: '실시간 차트가 정말 정확하고 빨라서 투자 결정에 큰 도움이 됩니다.',
         rating: 5,
      },
      {
         name: '박암호',
         role: '암호화폐 트레이더',
         content: '뉴스와 차트를 한 곳에서 볼 수 있어서 편리해요. 인터페이스도 깔끔합니다.',
         rating: 5,
      },
      {
         name: '이분석',
         role: '투자 분석가',
         content: '커뮤니티에서 다른 투자자들과 정보 공유하는 것이 정말 유용합니다.',
         rating: 5,
      },
   ]

   return (
      <div className="landing-page">
         <section className="hero">
            <div className="hero-background">
               <div className="hero-pattern"></div>
            </div>
            <div className="container">
               <div className="hero-content">
                  <div className="hero-text">
                     <h1 className="hero-title fade-in">의견을 공유하여 당신의 투자력을 높이세요</h1>
                     <p className="hero-description slide-up">KOJARAL은 실시간 암호화폐 차트와 최신 투자 뉴스, 그리고 투자자들의 소통 공간을 제공하는 종합 투자 플랫폼입니다.</p>
                     <div className="hero-buttons slide-up">
                        <Link to="/markets" className="btn btn-primary">
                           차트 보기
                           <ArrowRight size={20} />
                        </Link>
                        <Link to="/community" className="btn btn-outline">
                           커뮤니티 참여
                        </Link>
                     </div>
                  </div>
                  <div className="hero-visual">
                     <div className="floating-card">
                        <div className="mini-chart">
                           <TrendingUp size={24} className="chart-icon" />
                           <div className="chart-data">
                              <span className="coin-name">BTC/KRW</span>
                              <span className="coin-price">₩45,234,000</span>
                              <span className="coin-change positive">+2.34%</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section className="features section">
            <div className="container">
               <div className="section-header text-center">
                  <h2>왜 STOCKLOUNGE을 선택해야 할까요?</h2>
                  <p>투자자들을 위한 완벽한 올인원 플랫폼</p>
               </div>

               <div className="features-grid">
                  {features.map((feature, index) => (
                     <div key={index} className="feature-card card fade-in">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="popular-coins section">
            <div className="container">
               <div className="section-header">
                  <h2>인기 코인 현황</h2>
                  <Link to="/markets" className="view-all-link">
                     전체 보기 <ArrowRight size={16} />
                  </Link>
               </div>

               {isLoading ? (
                  <div className="loading">
                     <div className="spinner"></div>
                  </div>
               ) : (
                  <div className="coins-grid">
                     {popularCoins.map((coin, index) => (
                        <Link key={coin.market} to={`/coin/${coin.market}`} className="coin-card card">
                           <div className="coin-header">
                              <div>
                                 <h4>{coin.korean_name}</h4>
                                 <span className="coin-symbol">{coin.market}</span>
                              </div>
                              <div className="coin-chart-mini">
                                 <BarChart3 size={20} />
                              </div>
                           </div>
                           <div className="coin-info">
                              <span className="coin-price">로딩중...</span>
                              <span className="coin-change">-</span>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         </section>

         <section className="latest-news section">
            <div className="container">
               <div className="section-header">
                  <h2>최신 뉴스</h2>
                  <Link to="/news" className="view-all-link">
                     전체 보기 <ArrowRight size={16} />
                  </Link>
               </div>

               {isLoading ? (
                  <div className="loading">
                     <div className="spinner"></div>
                  </div>
               ) : (
                  <div className="news-grid">
                     {latestNews.map((article, index) => (
                        <article key={index} className="news-card card">
                           <div className="news-content">
                              <h3>{article.title}</h3>
                              <p>{article.description}</p>
                              <div className="news-meta">
                                 <span className="news-source">{article.source}</span>
                                 <span className="news-time">{article.time}</span>
                              </div>
                           </div>
                           <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
                              읽어보기 <ArrowRight size={16} />
                           </a>
                        </article>
                     ))}
                  </div>
               )}
            </div>
         </section>

         <section className="testimonials section">
            <div className="container">
               <div className="section-header text-center">
                  <h2>사용자 후기</h2>
                  <p>실제 사용자들의 생생한 후기를 확인해보세요</p>
               </div>

               <div className="testimonials-grid">
                  {testimonials.map((testimonial, index) => (
                     <div key={index} className="testimonial-card card">
                        <div className="testimonial-rating">
                           {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                           ))}
                        </div>
                        <p className="testimonial-content">"{testimonial.content}"</p>
                        <div className="testimonial-author">
                           <div className="author-avatar">{testimonial.name.charAt(0)}</div>
                           <div>
                              <div className="author-name">{testimonial.name}</div>
                              <div className="author-role">{testimonial.role}</div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="cta section">
            <div className="container">
               <div className="cta-content text-center">
                  <h2>지금 바로 시작하세요</h2>
                  <p>STOCKLOUNGE와 함께 더 나은 투자 결정을 내려보세요</p>
                  <div className="cta-buttons">
                     <Link to="/home" className="btn btn-primary">
                        <Zap size={20} />
                        무료로 시작하기
                     </Link>
                     <Link to="/board" className="btn btn-outline">
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
