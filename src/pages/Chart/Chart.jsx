import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Nav } from 'react-bootstrap'
import CandleChart from '../../components/chart/CandleChart'
import CoinList from '../../components/chart/CoinList'
import styles from '../../styles/pages/Chart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsThunk } from '../../features/newsSlice'
import he from 'he'
import { getMarketAllThunk, getTickerAllThunk } from '../../features/coinSlice'
import DOMPurify from 'dompurify'

// 임시 데이터: 실제로는 API 연동 예정

const Chart = () => {
   const dispatch = useDispatch()
   const { news } = useSelector((s) => s.news)
   const { coins, coinList } = useSelector((s) => s.coin)
   const [coinData, setCoinData] = useState(null)
   // 첫 번째 세션: 선택된 코인 상태
   const [selectedCoin, setSelectedCoin] = useState(null)
   // 차트 기간(일간/주간/월간/년간)
   const [period, setPeriod] = useState('days')

   // 코인 리스트에서 코인 클릭 시
   const handleCoinSelect = (coin) => {
      setSelectedCoin(coin)
   }

   useEffect(() => {
      dispatch(getNewsThunk({ length: 5, start: 1, query: '암호화폐' }))
   }, [dispatch])

   useEffect(() => {
      const fetchData = async () => {
         if (coins.length === 0 || coinList.length === 0) {
            const conlist = await dispatch(getMarketAllThunk()).unwrap()
            const result = await dispatch(getTickerAllThunk(30)).unwrap()

            const mapped = result.map((coin, index) => ({
               id: coin.market,
               symbol: coin.market.split('-')[1],
               name: conlist.find((e) => e.market === coin.market)?.korean_name ?? '',
               price: coin.trade_price,
               change24h: coin.signed_change_rate,
               volume24h: coin.acc_trade_volume_24h,
               rank: index + 1,
            }))

            setCoinData(mapped)

            setSelectedCoin(mapped[0])
         }
      }

      fetchData()
   }, [coins, coinList, dispatch])

   if (!selectedCoin) return <div>Loading...</div>

   return (
      <Container fluid className={styles.chartContainer}>
         <Row className="mb-4">
            <Col lg={8}>
               {/* 1. 메인 차트 세션 */}
               <Row>
                  <Row>
                     <Col>
                        <div className={styles.userHeader}>
                           <h3>{selectedCoin.name}</h3>
                           <Nav variant="tabs">
                              <Nav.Item>
                                 <Nav.Link active={period === 'days'} onClick={() => setPeriod('days')}>
                                    일간
                                 </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link active={period === 'weeks'} onClick={() => setPeriod('weeks')}>
                                    주간
                                 </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link active={period === 'months'} onClick={() => setPeriod('months')}>
                                    월간
                                 </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link active={period === 'years'} onClick={() => setPeriod('years')}>
                                    연간
                                 </Nav.Link>
                              </Nav.Item>
                           </Nav>
                        </div>
                     </Col>
                  </Row>
                  {selectedCoin && <CandleChart coin={selectedCoin} period={period} />}
               </Row>
               {/* 2. TOP2 코인 차트 세션 */}
               {coinData && (
                  <Row className="mb-4">
                     <Col lg={6}>
                        <CandleChart coin={coinData[0]} period={period} small />
                     </Col>
                     <Col lg={6}>
                        <CandleChart coin={coinData[1]} period={period} small />
                     </Col>
                  </Row>
               )}
            </Col>
            {/* 4. 우측 사이드바: 뉴스/게시글 */}
            <Col lg={4} md={12}>
               <Row>
                  <Col md={12}>
                     <Card className="mb-3">
                        <Card.Header>최신 뉴스</Card.Header>
                        <Card.Body>
                           <ul>
                              {news &&
                                 news['암호화폐']?.items.map((e) => (
                                    <li key={e.link} className={styles.sidebarList}>
                                       <a
                                          href={e.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          dangerouslySetInnerHTML={{
                                             __html: DOMPurify.sanitize(he.decode(e.title), {
                                                ALLOWED_TAGS: ['b', 'i'],
                                                ALLOWED_ATTR: [],
                                             }),
                                          }}
                                       />
                                    </li>
                                 ))}
                           </ul>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={12}>
                     <Card>
                        <Card.Header>인기 게시글</Card.Header>
                        <Card.Body>
                           {/* TODO: 인기 게시글 연동 */}
                           <ul>
                              <li>게시글 1</li>
                              <li>게시글 2</li>
                              <li>게시글 3</li>
                              <li>게시글 4</li>
                              <li>게시글 5</li>
                              <li>게시글 6</li>
                              <li>게시글 7</li>
                              <li>게시글 8</li>
                              <li>게시글 9</li>
                              <li>게시글 10</li>
                           </ul>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Col>
         </Row>

         {/* 3. 코인 리스트 세션 */}
         <Row>
            <Col md={12}>{selectedCoin && <CoinList onCoinSelect={handleCoinSelect} selectedCoin={selectedCoin.id} />}</Col>
         </Row>
      </Container>
   )
}

export default Chart
