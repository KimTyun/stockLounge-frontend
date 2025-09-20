import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Nav } from 'react-bootstrap'
import CandleChart from '../../components/chart/CandleChart'
import CoinList from '../../components/chart/CoinList'
import styles from '../../styles/pages/Chart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsThunk } from '../../features/newsSlice'
import he from 'he'
import { getcandlesThunk, getMarketAllThunk, getTickerAllThunk } from '../../features/coinSlice'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'
import { recommendBoardsThunk } from '../../features/boardSlice'
import { setSelectedCoin, setCoinData } from '../../features/coinSlice'

const Chart = () => {
   const dispatch = useDispatch()
   const { news } = useSelector((s) => s.news)
   const { coins, coinList, selectedCoin, coinData } = useSelector((s) => s.coin)
   const { user } = useSelector((s) => s.user)
   const { recommend } = useSelector((s) => s.board)

   // 첫 번째 세션: 선택된 코인 상태

   // 차트 기간(일간/주간/월간/년간)
   const [period, setPeriod] = useState('days')

   // 코인 리스트에서 코인 클릭 시
   const handleCoinSelect = (coin) => {
      dispatch(setSelectedCoin(coin))
   }

   useEffect(() => {
      dispatch(getNewsThunk({ length: 5, start: 1, query: '암호화폐' }))
      dispatch(recommendBoardsThunk(user ? user.id : 1))
   }, [dispatch, user])

   useEffect(() => {
      const fetchData = async () => {
         if (!selectedCoin && !coins.length && !coinList.length) {
            const conlist = await dispatch(getMarketAllThunk()).unwrap()
            const result = await dispatch(getTickerAllThunk(30)).unwrap()

            const mapped = result.data.map((coin, index) => ({
               id: coin.market,
               symbol: coin.market.split('-')[1],
               name: conlist.find((e) => e.market === coin.market)?.korean_name ?? '',
               price: coin.trade_price,
               change24h: coin.signed_change_rate,
               volume24h: coin.acc_trade_volume_24h,
               rank: index + 1,
            }))

            dispatch(setCoinData(mapped))
            if (!selectedCoin) {
               dispatch(setSelectedCoin(mapped[0]))
            }
         }
      }

      fetchData()
   }, [dispatch, coins.length, coinList.length])

   useEffect(() => {
      if (!selectedCoin) return

      dispatch(getcandlesThunk({ time: period, params: { market: selectedCoin.id, count: 60 } }))
   }, [dispatch, selectedCoin, period])

   if (!selectedCoin)
      return (
         <>
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">로딩중...</p>
         </>
      )

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
                              {news ? (
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
                                 ))
                              ) : (
                                 <>
                                    <div className="spinner-border text-primary" role="status">
                                       <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">뉴스 데이터를 불러오는 중...</p>
                                 </>
                              )}
                           </ul>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={12}>
                     <Card>
                        <Card.Header>{user ? '맞춤 게시글' : '인기 게시글'}</Card.Header>
                        <Card.Body>
                           <ul>
                              {recommend ? (
                                 recommend.map((e) => (
                                    <li className={styles.sidebarList} key={e.board_id}>
                                       <Link to={`/board?id=${e.board_id}`}>{e.title}</Link>
                                    </li>
                                 ))
                              ) : (
                                 <>
                                    <div className="spinner-border text-primary" role="status">
                                       <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">게시판을 불러오는 중...</p>
                                 </>
                              )}
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
