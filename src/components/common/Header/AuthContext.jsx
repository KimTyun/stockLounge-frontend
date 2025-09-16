import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios'

// Axios 인스턴스 생성. 실제 애플리케이션에서는 이 설정을
// src/services/api.js 와 같은 중앙 관리 파일로 옮기는 것이 좋습니다.
const apiClient = axios.create({
   // 백엔드 API 주소
   baseURL: 'http://localhost:8000',
   // 세션 쿠키를 주고받기 위해 withCredentials 옵션을 true로 설정합니다.
   // 백엔드에서도 CORS 설정을 통해 credentials를 허용해야 합니다.
   withCredentials: true,
})

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [loading, setLoading] = useState(true) // 초기 인증 상태 확인 로딩

   const checkAuthStatus = useCallback(async () => {
      setLoading(true)
      try {
         // 백엔드의 /auth/status 엔드포인트를 호출하여 로그인 상태를 확인합니다.
         const response = await apiClient.get('/auth/status')
         if (response.data.isAuthenticated) {
            setUser(response.data.user)
            setIsAuthenticated(true)
         } else {
            setUser(null)
            setIsAuthenticated(false)
         }
      } catch (error) {
         console.error('인증 상태 확인 중 오류 발생:', error)
         setUser(null)
         setIsAuthenticated(false)
      } finally {
         setLoading(false)
      }
   }, [])

   useEffect(() => {
      checkAuthStatus()
   }, [checkAuthStatus])

   // 로그인 함수
   const login = async (email, password) => {
      try {
         const response = await apiClient.post('/auth/login', { email, password })
         if (response.data.success) {
            // 로그인 성공 시, 서버로부터 최신 인증 상태와 사용자 정보를 다시 가져옵니다.
            await checkAuthStatus()
         }
         return response.data
      } catch (error) {
         console.error('로그인 실패:', error.response?.data?.message || error.message)
         // 컴포넌트에서 에러 메시지를 사용할 수 있도록 에러를 다시 throw 합니다.
         throw error.response?.data || new Error('로그인에 실패했습니다.')
      }
   }

   // 로그아웃 함수
   const logout = async () => {
      try {
         await apiClient.get('/auth/logout')
         setUser(null)
         setIsAuthenticated(false)
      } catch (error) {
         console.error('로그아웃 실패:', error)
      }
   }

   // 컨텍스트로 전달할 값
   const value = { user, isAuthenticated, loading, login, logout, checkAuthStatus }

   return (
      <AuthContext.Provider value={value}>
         {/* 로딩 중에도 자식 컴포넌트를 렌더링하여 UI가 항상 표시되도록 합니다. */}
         {children}
      </AuthContext.Provider>
   )
}

// AuthContext를 다른 파일에서 사용할 수 있도록 export
export { AuthContext }
