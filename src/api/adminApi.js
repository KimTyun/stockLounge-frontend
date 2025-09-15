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

// 사용자 관리
export const getUsers = async () => {
   try {
      const response = await axiosApi.get(`/admin/users`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const getUserById = async (userId) => {
   try {
      const response = await axiosApi.get(`/admin/user/${userId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const updateUserBanStatus = async (userId, isBanned) => {
   try {
      const response = await axiosApi.put(`/admin/user/${userId}/ban`, { is_ban: isBanned })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
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
export const deleteBoard = async (boardId) => {
   try {
      const response = await axiosApi.delete(`/admin/boards/${boardId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 사이트 설정 (getSiteSettings, updateSiteSettings)
export const getSiteSettings = async () => {
   try {
      const response = await axiosApi.get(`/admin/settings`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const updateSiteSettings = async (settings) => {
   try {
      const response = await axiosApi.put(`/admin/settings`, settings)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 금지어 관리 (getBanWords, addBanWord, deleteBanWord)
export const getBanWords = async () => {
   try {
      const response = await axiosApi.get(`/admin/ban-words`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const addBanWord = async (word) => {
   try {
      const response = await axiosApi.post(`/admin/ban-words`, { word })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const deleteBanWord = async (wordId) => {
   try {
      const response = await axiosApi.delete(`/admin/ban-words/${wordId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 교환품 관리 (addReward, updateReward, deleteReward)
export const addReward = async (rewardData) => {
   try {
      const response = await axiosApi.post(`/admin/rewards`, rewardData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const updateReward = async (rewardId, rewardData) => {
   try {
      const response = await axiosApi.put(`/admin/rewards/${rewardId}`, rewardData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
export const deleteReward = async (rewardId) => {
   try {
      const response = await axiosApi.delete(`/admin/rewards/${rewardId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 통계
export const getStatistics = async () => {
   try {
      const response = await axiosApi.get(`/admin/statistics`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
