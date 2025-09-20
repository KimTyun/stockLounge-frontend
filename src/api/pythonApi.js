import axios from 'axios'

const env = import.meta.env.VITE_ENV
const BASE_URL = import.meta.env.VITE_PYTHON_URL

//axios 인스턴스 생성
const pythonApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json', // request, response 할때 json 객체로 주고 받겠다
   },
   withCredentials: true, // 세션이나 쿠키를 request에 포함
})

// 추천수*1 + 댓글수*0.7 & 리폿 수만큼 가중치 감소
export const recommendBoards = async (userId) => {
   try {
      const response = await pythonApi.get(`/recommend?user_id=${userId}`)

      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
