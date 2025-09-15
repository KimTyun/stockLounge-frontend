import axiosApi from './index'

// 대시보드
export const getDashboardData = async () => {
   try {
      const response = await axiosApi.get(`/admin/dashboard-data`)
      return response
   } catch (error) {
      console.error('대시보드를 불러오지 못했습니다.', error)
      throw error
   }
}

// 사용자 조회
export const getUsers = async () => {
   try {
      const response = await axiosApi.get(`/admin/users/`)
      return response
   } catch (error) {
      console.error('사용자 목록을 불러오지 못했습니다.', error)
      throw error
   }
}

// 특정 사용자 정보
export const getUserById = async (userId) => {
   try {
      const response = await axiosApi.get(`/admin/user/${userId}`)
      return response
   } catch (error) {
      console.error(`사용자를 불러오지 못했습니다.`, error)
      throw error
   }
}

// 사용자 밴 처리
export const updateUserBanStatus = async (userId, isBanned) => {
   try {
      const response = await axiosApi.put(`/admin/user/${userId}/ban`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ isban: isBanned }),
      })
      return response
   } catch (error) {
      console.error(`사용자 제재 처리에 실패 했습니다.`, error)
      throw error
   }
}

// 게시판 조회
export const getBoards = async () => {
   try {
      const response = await axiosApi.get(`/admin/boards`)
      return response
   } catch (error) {
      console.error('게시판을 불러오지 못했습니다.', error)
      throw error
   }
}

// 게시판 삭제
export const deleteBoard = async (boardId) => {
   try {
      const response = await axiosApi.delete(`/admin/boards/${boardId}`, {
         method: 'DELETE',
      })
      return response
   } catch (error) {
      console.error(`게시판을 삭제하지 못했습니다.`, error)
      throw error
   }
}

// 금칙어 조회
export const getBanWords = async () => {
   try {
      const response = await axiosApi.get(`/admin/ban-words`)
      return response
   } catch (error) {
      console.error('금지어를 불러오지 못했습니다.', error)
      throw error
   }
}

// 금칙어 추가
export const addBanWord = async (word) => {
   try {
      const response = await axiosApi.post(`/admin/ban-words`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ word }),
      })
      return response
   } catch (error) {
      console.error('금칙어를 생성하지 못했습니다.', error)
      throw error
   }
}

// 금칙어 삭제
export const deleteBanWord = async (wordId) => {
   try {
      const response = await axiosApi.delete(`/admin/ban-words/${wordId}`, {
         method: 'DELETE',
      })
      return response
   } catch (error) {
      console.error('금칙어를 삭제하지 못했습니다.', error)
      throw error
   }
}

// 사이트 설정
export const getSiteSettings = async () => {
   try {
      const response = await axiosApi.get(`/admin/settings`)
      return response
   } catch (error) {
      console.error('사이트 설정을 불러오지 못했습니다.', error)
   }
}

// 사이트 설정 갱신
export const updateSiteSettings = async (settings) => {
   try {
      const response = await axiosApi.put(`/admin/settings`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(settings),
      })
      return response
   } catch (error) {
      console.error('사이트 세팅 갱신에 실패했습니다.', error)
      throw error
   }
}

// 교환품 생성
export const addReward = async (rewardData) => {
   try {
      const response = await axiosApi.post(`/admin/rewards`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(rewardData),
      })
      return response
   } catch (error) {
      console.error('교환품을 생성하지 못했습니다.', error)
      throw error
   }
}

// 교환품 수정
export const updateReward = async (rewardId, rewardData) => {
   try {
      const response = await axiosApi.put(`/admin/rewards/${rewardId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(rewardData),
      })
      return response
   } catch (error) {
      console.error('교환품을 수정하지 못했습니다.', error)
      throw error
   }
}

// 교환품 삭제
export const deleteReward = async (rewardId) => {
   try {
      const response = await axiosApi.delete(`/admin/rewards/${rewardId}`, {
         method: 'DELETE',
      })
      return response
   } catch (error) {
      console.error(`교환품을 삭제하지 못했습니다.`, error)
      throw error
   }
}

// 통계
export const getStatistics = async () => {
   try {
      const response = await axiosApi.get(`/admin/statistics`)
      return response
   } catch (error) {
      console.error('통계를 불러오지 못했습니다.', error)
      throw error
   }
}
