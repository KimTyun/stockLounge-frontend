import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

// Naver News API 서비스 클래스
class NaverApiService {
   // 뉴스 검색
   async getNews(query = '코인', length = 10, start = 1) {
      try {
         const response = await axios.get(`${API_BASE_URL}/news`, {
            params: {
               query,
               length,
               start,
            },
         })
         return response.data
      } catch (error) {
         console.error('Error fetching news:', error)
         throw error
      }
   }

   // 암호화폐 뉴스 검색
   async getCryptoNews(length = 10) {
      try {
         const response = await this.getNews('암호화폐 비트코인 이더리움', length)
         return response
      } catch (error) {
         console.error('Error fetching crypto news:', error)
         throw error
      }
   }

   // 경제 뉴스 검색
   async getEconomyNews(length = 10) {
      try {
         const response = await this.getNews('경제 주식', length)
         return response
      } catch (error) {
         console.error('Error fetching economy news:', error)
         throw error
      }
   }
}

export default new NaverApiService()
