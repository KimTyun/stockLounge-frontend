import axios from 'axios'

const UPBIT_API_URL = 'http://localhost:8000/upbit'

// Upbit API 서비스 클래스
class UpbitApiService {
   // 모든 코인 목록 조회
   async getAllCoins() {
      try {
         const response = await axios.get(`${UPBIT_API_URL}/coins`)
         return response.data
      } catch (error) {
         console.error('Error fetching coins:', error)
         throw error
      }
   }

   // 특정 코인의 현재가 정보 조회
   async getCoinData(market) {
      try {
         const response = await axios.get(`${UPBIT_API_URL}/coins/${market}`)
         return response.data
      } catch (error) {
         console.error('Error fetching coin data:', error)
         throw error
      }
   }

   // 캔들 데이터 조회
   async getCandles(market, timeframe = 'minutes/5', count = 200) {
      try {
         const response = await axios.get(`${UPBIT_API_URL}/coins/${market}/candles/${timeframe}`, {
            params: { count },
         })
         return response.data
      } catch (error) {
         console.error('Error fetching candles:', error)
         throw error
      }
   }

   // 실시간 시세 조회
   async getTicker(market) {
      try {
         const response = await axios.get(`${UPBIT_API_URL}/coins/${market}/ticker`)
         return response.data
      } catch (error) {
         console.error('Error fetching ticker:', error)
         throw error
      }
   }

   // 여러 코인의 시세 조회
   async getTickers(markets = ['KRW-BTC', 'KRW-ETH', 'KRW-XRP']) {
      try {
         const response = await axios.get(`${UPBIT_API_URL}/tickers`, {
            params: { markets: markets.join(',') },
         })
         return response.data
      } catch (error) {
         console.error('Error fetching tickers:', error)
         throw error
      }
   }
}

export default new UpbitApiService()
