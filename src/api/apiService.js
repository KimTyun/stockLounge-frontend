import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

// Axios 인스턴스 생성
const api = axios.create({
   baseURL: API_BASE_URL,
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json',
   },
})

// API 서비스 클래스
class ApiService {
   // 헬스체크
   async healthCheck() {
      try {
         const response = await api.get('/health')
         return response.data
      } catch (error) {
         console.error('Health check failed:', error)
         throw error
      }
   }

   // 코인 관련 API (Upbit API 사용)
   async getAllCoins() {
      try {
         const response = await api.get('/upbit/coins')
         return response.data
      } catch (error) {
         console.error('Error fetching coins:', error)
         throw error
      }
   }

   async getCoinData(market) {
      try {
         const response = await api.get(`/upbit/coins/${market}`)
         return response.data
      } catch (error) {
         console.error('Error fetching coin data:', error)
         throw error
      }
   }

   async getCandles(market, timeframe = 'minutes/5', count = 200) {
      try {
         const response = await api.get(`/upbit/coins/${market}/candles/${timeframe}`, {
            params: { count },
         })
         return response.data
      } catch (error) {
         console.error('Error fetching candles:', error)
         throw error
      }
   }

   // 뉴스 관련 API (Naver API 사용)
   async getNews(query = '코인', length = 10, start = 1) {
      try {
         const response = await api.get('/news', {
            params: { query, length, start },
         })
         return response.data
      } catch (error) {
         console.error('Error fetching news:', error)
         throw error
      }
   }

   async getCryptoNews(length = 10) {
      try {
         const response = await this.getNews('암호화폐 비트코인 이더리움', length)
         return response
      } catch (error) {
         console.error('Error fetching crypto news:', error)
         throw error
      }
   }

   // 실시간 WebSocket 연결 (향후 구현)
   connectWebSocket(onMessage) {
      const socket = new WebSocket('wss://api.upbit.com/websocket/v1')

      socket.onopen = () => {
         console.log('WebSocket connected')
         // 구독할 코인들 설정
         const subscribeData = [{ ticket: 'UNIQUE_TICKET' }, { type: 'ticker', codes: ['KRW-BTC', 'KRW-ETH', 'KRW-XRP'] }]
         socket.send(JSON.stringify(subscribeData))
      }

      socket.onmessage = (event) => {
         const data = JSON.parse(event.data)
         if (onMessage) {
            onMessage(data)
         }
      }

      socket.onerror = (error) => {
         console.error('WebSocket error:', error)
      }

      return socket
   }
}

export default new ApiService()
