import axiosApi from './index'
const env = import.meta.env.VITE_ENV

// 사용자 상태 및 권한 확인
export const getUserStatus = async () => {
   try {
      const response = await axiosApi.get('/admin/user-status')
      return response.data
   } catch (error) {
      if (env === 'development') console.error('API Error:', error)
      throw error
   }
}

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

// 사용자 조회(관리자용)
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

// 사용자 보상 업데이트
export const updateUserReward = async (userId, rewardAmount) => {
   try {
      // API 엔드포인트와 요청 바디를 프로젝트에 맞게 조정하세요.
      const response = await axiosApi.put(`/admin/user/${userId}/reward`, { reward: rewardAmount })
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

// 상품 관리
export const getProducts = async () => {
   try {
      const response = await axiosApi.get(`/admin/products`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 상품 추가
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

// 상품 수정
export const updateProduct = async (ProductId, ProductData) => {
   try {
      const response = await axiosApi.put(`/admin/products/${ProductId}`, ProductData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 상품 삭제
export const deleteProduct = async (ProductId) => {
   try {
      const response = await axiosApi.delete(`/admin/products/${ProductId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 상품 유형 관리
export const getProductLists = async () => {
   try {
      const response = await axiosApi.get('/admin/product-lists')
      return response.data.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 상품 유형 생성
export const addProductList = async (listData) => {
   try {
      const response = await axiosApi.post('/admin/product-lists', listData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 상품 유형 수정
export const updateProductList = async (listId, listData) => {
   try {
      const response = await axiosApi.put(`/admin/product-lists/${listId}`, listData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 상품 유형 삭제
export const deleteProductList = async (listId) => {
   try {
      const response = await axiosApi.delete(`/admin/product-lists/${listId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// // 여기부터 통계

// 통계
export const getStatistics = async (period) => {
   try {
      const response = await axiosApi.get(`/admin/statistics?period=${period}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
