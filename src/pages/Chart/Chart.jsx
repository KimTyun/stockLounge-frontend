import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CandleChart from '../../components/chart/CandleChart'
import CoinList from '../../components/chart/CoinList'
import styles from '../../styles/pages/Chart.module.css'
// 임시 데이터: 실제로는 API 연동 예정
const DEFAULT_COIN = {
   id: 'pointcoin',
   name: 'PointCoin',
   symbol: 'PTC',
   price: '₩1,000',
   change: '+0.00%',
   changeAmount: '+0',
   isPositive: true,
}

const TOP2 = [
   {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '₩63,250,000',
      change: '+2.5%',
      isPositive: true,
   },
   {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: '₩2,850,000',
      change: '+1.8%',
      isPositive: true,
   },
]

const Chart = () => {
   // 첫 번째 세션: 선택된 코인 상태
   const [selectedCoin, setSelectedCoin] = useState(DEFAULT_COIN)
   // 차트 기간(일간/주간/월간/년간)
   const [period, setPeriod] = useState('1D')

   // 코인 리스트에서 코인 클릭 시
   const handleCoinSelect = (coin) => {
      setSelectedCoin(coin)
   }

   // 차트 기간 변경
   const handlePeriodChange = (p) => {
      setPeriod(p)
   }

   return (
      <Container fluid className={styles.chartContainer}>
         {/* 1. 메인 차트 세션 */}
         <Row className="mb-4">
            <Col md={8}>
               <Row>
                  <CandleChart coin={selectedCoin} period={period} />
               </Row>
               {/* 2. TOP2 코인 차트 세션 */}
               <Row className="mb-4">
                  {TOP2.map((coin) => (
                     <Col md={6} key={coin.id}>
                        {/* 기간 버튼은 메인 차트와 연동 */}
                        <CandleChart coin={coin} period={period} small />
                     </Col>
                  ))}
               </Row>
            </Col>
            {/* 4. 우측 사이드바: 뉴스/게시글 */}
            <Col md={4}>
               <Row>
                  <Col md={12} xs={6}>
                     <Card className="mb-3">
                        <Card.Header>최신 뉴스</Card.Header>
                        <Card.Body>
                           {/* TODO: 네이버 뉴스 API 연동 */}
                           <ul>
                              <li>뉴스 1</li>
                              <li>뉴스 2</li>
                              <li>뉴스 3</li>
                              <li>뉴스 4</li>
                              <li>뉴스 5</li>
                              <li>뉴스 6</li>
                              <li>뉴스 7</li>
                              <li>뉴스 8</li>
                              <li>뉴스 9</li>
                              <li>뉴스 10</li>
                           </ul>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col md={12} xs={6}>
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
            <Col md={12}>
               <CoinList onCoinSelect={handleCoinSelect} selectedCoin={selectedCoin.id} />
            </Col>
         </Row>
      </Container>
   )
}

export default Chart
