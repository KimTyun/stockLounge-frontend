import { useState, useEffect } from 'react'
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import styles from '../../../styles/components/chart/CandleChart.module.css'

const CandleChart = ({ period, coin, small }) => {
   const [selectedCoin, setSelectedCoin] = useState('BTC')

   // 임시 차트 데이터 (실제로는 Upbit API에서 가져올 예정)
   const mockPrice = selectedCoin === 'BTC' ? '₩65,500,000' : selectedCoin === 'ETH' ? '₩2,850,000' : '₩650'
   const mockChange = selectedCoin === 'BTC' ? '+2.34%' : selectedCoin === 'ETH' ? '+1.87%' : '+5.21%'

   return (
      <Card className={`${styles.chartCard} ${small && styles.small} mb-3`}>
         <Card.Body className={styles.chartBody}>
            <div className={styles.priceInfo}>
               <h3 className={styles.coinName}>{coin.name}</h3>
               <div className={styles.priceData}>
                  <span className={styles.currentPrice}>{mockPrice}</span>
                  <span className={`${styles.priceChange} ${styles.positive}`}>{mockChange}</span>
               </div>
            </div>

            <div className={`${styles.chartContainer} ${small && styles.small}`}>
               {/* 실제 차트는 Chart.js나 TradingView 위젯으로 구현 예정 */}
               <div className={styles.mockChart}>
                  <p>차트 영역 (구현 예정)</p>
                  <div className={styles.chartPlaceholder}>📈 {selectedCoin} 차트</div>
               </div>
            </div>
         </Card.Body>
      </Card>
   )
}

export default CandleChart
