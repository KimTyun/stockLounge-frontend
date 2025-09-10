import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import styles from '../../../styles/components/chart/CandleChart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getcandlesThunk } from '../../../features/coinSlice'

const CandleChart = ({ period = 'days', coin, small }) => {
   const dispatch = useDispatch()
   const { data, loading } = useSelector((s) => s.coin)
   const coinData = data[coin.id]

   useEffect(() => {
      dispatch(getcandlesThunk({ time: period, params: { market: coin.id, count: small ? 50 : 100 } }))
         .unwrap()
         .then((result) => {
            // console.log('차트 데이터', result)
         })
   }, [dispatch, coin, small, period])

   return (
      <Card className={`${styles.chartCard} ${small && styles.small} mb-3`}>
         <Card.Body className={styles.chartBody}>
            <div className={styles.priceInfo}>
               <div className={styles.priceData}>
                  <span className={styles.currentPrice}>000,000</span>
                  <span className={`${styles.priceChange} ${styles.positive}`}>+0.00%</span>
               </div>
            </div>

            <div className={`${styles.chartContainer} ${small && styles.small}`}>
               {/* 실제 차트는 Chart.js나 TradingView 위젯으로 구현 예정 */}
               <div className={styles.mockChart}>
                  {loading && <p>차트 로딩중...</p>}
                  <p>차트 영역 (구현 예정)</p>
                  <div className={styles.chartPlaceholder}>📈 {coin.id} 차트</div>
               </div>
            </div>
         </Card.Body>
      </Card>
   )
}

export default CandleChart
