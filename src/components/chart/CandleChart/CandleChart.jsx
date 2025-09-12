import { useEffect, useMemo } from 'react'
import { Card } from 'react-bootstrap'
import styles from '../../../styles/components/chart/CandleChart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getcandlesThunk } from '../../../features/coinSlice'
import Chart from 'react-apexcharts'

/**
 * 컴포넌트 사용시 coin props 필수
 * period : days, weeks, months, years,
 * coin : {id: market데이터(KRW-BTC), symbol: 코인 심볼(BTC), name: 코인 한글이름(비트코인), price : signed_change_rate, change24h: acc_trade_volume_24h}
 */
const CandleChart = ({ period = 'days', coin, small = false }) => {
   const dispatch = useDispatch()
   const { data, loading } = useSelector((s) => s.coin)
   const coinData = useMemo(() => {
      if (!data[coin.id]) return null

      return data[coin.id]
         .slice()
         .reverse()
         .map((item) => ({
            x: new Date(item.candle_date_time_kst),
            y: [
               item.opening_price, // Open
               item.high_price, // High
               item.low_price, // Low
               item.trade_price, // Close
            ],
         }))
   }, [coin, data])
   const options = {
      chart: {
         type: 'candlestick',
         height: 500,
      },
      title: {
         text: `${coin.symbol}`,
         align: 'left',
      },
      xaxis: {
         type: 'datetime',
      },
      yaxis: {
         tooltip: {
            enabled: true,
         },
      },
   }

   useEffect(() => {
      dispatch(getcandlesThunk({ time: period, params: { market: coin.id, count: 60 } }))
   }, [dispatch, coin, small, period])

   return (
      <Card className={`${styles.chartCard} ${small && styles.small} mb-3`}>
         <Card.Body className={styles.chartBody}>
            <div className={styles.priceInfo}>
               <div className={styles.priceData}>
                  <span className={styles.currentPrice}>{coin.price?.toLocaleString()}</span>
                  <span className={`${styles.priceChange} ${coin.change24h > 0 ? styles.positive : styles.negative}`}>
                     {coin.change24h >= 0 ? '+' : ''}
                     {(coin.change24h * 100).toFixed(2)}%(24h)
                  </span>
               </div>
            </div>

            <div className={`${styles.chartContainer} ${small && styles.small}`}>
               {loading && <p>차트 로딩중...</p>}
               {coinData && <Chart options={options} series={[{ data: coinData || [] }]} type="candlestick" height={small ? 200 : 380} width={'100%'} />}
            </div>
         </Card.Body>
      </Card>
   )
}

export default CandleChart
