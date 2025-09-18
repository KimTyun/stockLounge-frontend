import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL

const axiosApi = axios.create({

  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,


// 요청 인터셉터 (인증 토큰 추가)
axiosApi.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => {
      return Promise.reject(error)
   }
)

// 응답 인터셉터 (오류 처리)
axiosApi.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      // 개발 환경에서만 에러 로그 출력
      if (import.meta.env.VITE_ENV === 'development') {
         console.error('API Error:', error)
      }
      // Redux Toolkit의 rejectWithValue에서 오류를 처리할 수 있도록 에러를 던짐
      return Promise.reject(error)
   }
)

export default axiosApi
