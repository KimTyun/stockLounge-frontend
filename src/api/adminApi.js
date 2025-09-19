import axiosApi from './index'
const env = import.meta.env.VITE_ENV

// 대시보드
export const getDashboardData = async () => {
   try {
      const response = await axiosApi.get(`/admin/dashboard-data`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 사용자 조회
export const getUsers = async () => {
   try {
      const response = await axiosApi.get(`/admin/users`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
// 특정 사용자 관리
export const getUserById = async (userId) => {
   try {
      const response = await axiosApi.get(`/admin/user/${userId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
// 사용자 제재 처리 관리
export const updateUserBanStatus = async (userId, isBanned) => {
   try {
      const response = await axiosApi.put(`/admin/user/${userId}/ban`, { is_ban: isBanned })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
// 사용자 삭제
export const deleteUser = async (userId) => {
   try {
      const response = await axiosApi.delete(`/admin/user/${userId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 게시판 관리
export const getBoards = async () => {
   try {
      const response = await axiosApi.get(`/admin/boards`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
// 게시판 삭제
export const deleteBoard = async (boardId) => {
   try {
      const response = await axiosApi.delete(`/admin/boards/${boardId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 사이트 설정
export const getSiteSettings = async () => {
   try {
      const response = await axiosApi.get(`/admin/settings`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 사이트 설정 수정
export const updateSiteSettings = async (settingsData) => {
   try {
      const response = await axiosApi.put(`/admin/settings`, settingsData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 금지어 조회
export const getBanWords = async () => {
   try {
      const response = await axiosApi.get(`/admin/ban-words`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 금지어 추가
export const addBanWord = async (banWordData) => {
   try {
      const params = new URLSearchParams()
      params.append('pattern', banWordData.pattern)
      params.append('description', banWordData.description)
      const response = await axiosApi.post(`/admin/ban-words`, banWordData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 금지어 삭제
export const deleteBanWord = async (banWordId) => {
   try {
      const response = await axiosApi.delete(`/admin/ban-words/${banWordId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 교환품 관리
export const getProducts = async () => {
   try {
      const response = await axiosApi.get(`/admin/products`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 교환품 추가
export const addProduct = async (ProductData) => {
   try {
      const response = await axiosApi.post(`/admin/products`, ProductData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 교환품 수정
export const updateProduct = async (ProductId, ProductData) => {
   try {
      const response = await axiosApi.put(`/admin/products/${ProductId}`, ProductData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
// 교환품 삭제
export const deleteProduct = async (ProductId) => {
   try {
      const response = await axiosApi.delete(`/admin/products/${ProductId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// // 여기부터 통계

// 전체 통계 데이터 가져오기 (period 매개변수 추가)
export const getStatistics = async (period = 'week') => {
   try {
      const response = await axiosApi.get(`/admin/statistics?period=${period}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error('getStatistics API Error:', error)
      throw error
   }
}

// 인기 게시글 가져오기 (별도 API가 필요한 경우)
export const getPopularPosts = async (period = 'week') => {
   try {
      const response = await axiosApi.get(`/admin/popular-posts?period=${period}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error('getPopularPosts API Error:', error)
      throw error
   }
}

// 활성 사용자 가져오기 (별도 API가 필요한 경우)
export const getActiveUsers = async (period = 'week') => {
   try {
      const response = await axiosApi.get(`/admin/active-users?period=${period}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error('getActiveUsers API Error:', error)
      throw error
   }
}

// 카테고리별 통계 가져오기 (별도 API가 필요한 경우)
export const getCategoryStats = async (period = 'week') => {
   try {
      const response = await axiosApi.get(`/admin/category-stats?period=${period}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error('getCategoryStats API Error:', error)
      throw error
   }
}

// 시간대별 통계 가져오기 (별도 API가 필요한 경우)
export const getHourlyStats = async (period = 'week') => {
   try {
      const response = await axiosApi.get(`/admin/hourly-stats?period=${period}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error('getHourlyStats API Error:', error)
      throw error
   }
}
