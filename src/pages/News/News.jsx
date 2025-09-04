import { useState } from 'react'
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap'
import styles from '../../styles/pages/News.module.css'

const News = () => {
   const [activeTab, setActiveTab] = useState('crypto')

   // 임시 뉴스 데이터
   const newsData = {
      crypto: [
         {
            id: 1,
            title: '비트코인, 65,000달러 돌파하며 사상 최고가 경신',
            content: '비트코인이 65,000달러를 돌파하며 새로운 역사를 쓰고 있습니다. 기관 투자자들의 관심 증가와 ETF 승인 기대감이 상승 요인으로 작용했습니다.',
            source: '코인데스크',
            time: '2025-09-04 14:30',
            image: '/api/placeholder/300/200',
            link: 'https://coindesk.com/bitcoin-new-high',
         },
         {
            id: 2,
            title: '이더리움 2.0 스테이킹, 3천만 ETH 돌파',
            content: '이더리움 2.0 네트워크에 스테이킹된 ETH가 3천만 개를 돌파했습니다. 이는 전체 공급량의 약 25%에 해당하는 수치입니다.',
            source: '이더리움재단',
            time: '2025-09-04 13:15',
            image: '/api/placeholder/300/200',
            link: 'https://ethereum.org/staking-milestone',
         },
         {
            id: 3,
            title: '리플, SEC와의 소송에서 부분 승리',
            content: 'XRP를 발행한 리플이 SEC와의 장기간 법정 다툼에서 부분적 승리를 거두었습니다. XRP의 증권 여부에 대한 명확한 기준이 제시될 것으로 보입니다.',
            source: '로이터',
            time: '2025-09-04 12:00',
            image: '/api/placeholder/300/200',
            link: 'https://reuters.com/ripple-sec-ruling',
         },
         {
            id: 4,
            title: '솔라나 생태계, DeFi 총 예치금 100억 달러 돌파',
            content: '솔라나 블록체인의 DeFi 생태계가 총 예치금 100억 달러를 돌파하며 이더리움에 이어 두 번째로 큰 규모를 기록했습니다.',
            source: '디파이펄스',
            time: '2025-09-04 11:30',
            image: '/api/placeholder/300/200',
            link: 'https://defipulse.com/solana-milestone',
         },
         {
            id: 5,
            title: '도지코인, 일론 머스크 트위터 언급으로 20% 급등',
            content: '일론 머스크가 트위터에서 도지코인을 언급한 후 가격이 20% 이상 급등했습니다. 도지코인은 여전히 머스크의 발언에 민감하게 반응하고 있습니다.',
            source: 'CoinGecko',
            time: '2025-09-04 10:45',
            image: '/api/placeholder/300/200',
            link: 'https://coingecko.com/dogecoin-surge',
         },
      ],
      economy: [
         {
            id: 6,
            title: '미 연준, 기준금리 0.25%p 인하 결정',
            content: '미국 연방준비제도가 기준금리를 0.25%포인트 인하하기로 결정했습니다. 인플레이션 압력 완화와 경제 성장 둔화를 고려한 조치입니다.',
            source: '월스트리트저널',
            time: '2025-09-04 13:45',
            image: '/api/placeholder/300/200',
            link: 'https://wsj.com/fed-rate-cut',
         },
         {
            id: 7,
            title: '국내 8월 소비자물가 상승률 2.1% 기록',
            content: '8월 소비자물가 상승률이 2.1%를 기록하며 한국은행의 물가 목표치인 2%를 소폭 상회했습니다. 식료품과 에너지 가격 상승이 주요 요인입니다.',
            source: '한국은행',
            time: '2025-09-04 12:30',
            image: '/api/placeholder/300/200',
            link: 'https://bok.or.kr/cpi-august',
         },
         {
            id: 8,
            title: '글로벌 주식시장, 연준 금리 인하 기대감에 상승',
            content: '미국의 금리 인하 기대감과 중국의 경기 부양책 발표로 글로벌 주식시장이 일제히 상승했습니다. 아시아 증시도 강세를 보이고 있습니다.',
            source: '블룸버그',
            time: '2025-09-04 11:15',
            image: '/api/placeholder/300/200',
            link: 'https://bloomberg.com/global-markets-rise',
         },
         {
            id: 9,
            title: '원달러 환율, 1,320원대로 하락',
            content: '원달러 환율이 1,320원대로 하락하며 원화가 강세를 보이고 있습니다. 미 달러 약세와 국내 경제 지표 개선이 원인으로 분석됩니다.',
            source: '연합뉴스',
            time: '2025-09-04 10:00',
            image: '/api/placeholder/300/200',
            link: 'https://yonhapnews.co.kr/usd-krw-rate',
         },
         {
            id: 10,
            title: '국제유가, 배럴당 85달러 돌파',
            content: '브렌트유 가격이 배럴당 85달러를 돌파했습니다. OPEC+ 감산 연장과 중동 지역 긴장 고조가 가격 상승 요인으로 작용했습니다.',
            source: 'Oil Price',
            time: '2025-09-04 09:30',
            image: '/api/placeholder/300/200',
            link: 'https://oilprice.com/brent-85-dollars',
         },
      ],
   }

   const currentNews = newsData[activeTab]

   return (
      <div className={styles.news}>
         <Container>
            <Row>
               <Col>
                  <div className={styles.newsHeader}>
                     <h2>뉴스</h2>
                     <Nav variant="tabs" className={styles.newsTabs}>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'crypto'} onClick={() => setActiveTab('crypto')} className={styles.tabLink}>
                              코인 뉴스
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                           <Nav.Link active={activeTab === 'economy'} onClick={() => setActiveTab('economy')} className={styles.tabLink}>
                              경제 뉴스
                           </Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </div>
               </Col>
            </Row>

            <Row>
               <Col>
                  <div className={styles.newsContent}>
                     {currentNews.map((article) => (
                        <Card key={article.id} className={styles.newsCard}>
                           <Row className="no-gutters">
                              <Col md={3}>
                                 <div className={styles.newsImage}>
                                    <img
                                       src={article.image}
                                       alt={article.title}
                                       onError={(e) => {
                                          e.target.src =
                                             'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='
                                       }}
                                    />
                                 </div>
                              </Col>
                              <Col md={9}>
                                 <Card.Body className={styles.newsBody}>
                                    <div className={styles.newsHeader}>
                                       <h5 className={styles.newsTitle}>{article.title}</h5>
                                       <div className={styles.newsMeta}>
                                          <span className={styles.newsSource}>{article.source}</span>
                                          <span className={styles.newsTime}>{article.time}</span>
                                       </div>
                                    </div>
                                    <p className={styles.newsContent}>{article.content}</p>
                                    <Button variant="outline-primary" size="sm" className={styles.readMoreBtn} onClick={() => window.open(article.link, '_blank')}>
                                       원문 보기
                                    </Button>
                                 </Card.Body>
                              </Col>
                           </Row>
                        </Card>
                     ))}
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default News
