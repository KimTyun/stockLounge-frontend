import axiosApi from '.'
const env = import.meta.env.VITE_ENV

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await axiosApi.get('/auth/status')
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 로그아웃
export const logout = async () => {
   try {
      const response = await axiosApi.get('/auth/logout')
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
