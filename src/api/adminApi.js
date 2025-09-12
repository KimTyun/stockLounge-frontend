const API_BASE_URL = process.env.VITE_APP_URL

const handleResponse = async (response) => {
   const data = await response.json()
   if (!response.ok) {
      throw new Error(data.error || '알 수 없는 오류가 발생했습니다.')
   }
   return data
}

// 대시보드
export const fetchDashboardData = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard-data`)
      return handleResponse(response)
   } catch (error) {
      console.error('대시보드를 불러오지 못했습니다.', error)
      throw error
   }
}

// 사용자 관리
export const fetchUsers = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/users/`)
      return handleResponse(response)
   } catch (error) {
      console.error('사용자 목록을 불러오지 못했습니다.', error)
      throw error
   }
}

// 특정 사용자 정보
export const fetchUserById = async (userId) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/user/${userId}`)
      return handleResponse(response)
   } catch (error) {
      console.error(`사용자를 불러오지 못했습니다.`, error)
      throw error
   }
}

// 사용자 밴 처리
export const updateUserBanStatus = async (userId, isBanned) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/user/${userId}/ban`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ isban: isBanned }),
      })
      return handleResponse(response)
   } catch (error) {
      console.error(`사용자를 제재하지 못했습니다.`, error)
      throw error
   }
}

// 게시판 관리
export const fetchBoards = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/boards`)
      return handleResponse(response)
   } catch (error) {
      console.error('게시판을 불러오지 못했습니다.', error)
      throw error
   }
}

// 게시판 삭제
export const deleteBoard = async (boardId) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/boards/${boardId}`, {
         method: 'DELETE',
      })
      return handleResponse(response)
   } catch (error) {
      console.error(`게시판을 삭제하지 못했습니다.`, error)
      throw error
   }
}

// 금칙어 관리
export const fetchBanWords = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/ban-words`)
      return handleResponse(response)
   } catch (error) {
      console.error('금지어를 불러오지 못했습니다.', error)
      throw error
   }
}

// 금칙어 추가
export const addBanWord = async (word) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/ban-words`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ word }),
      })
      return handleResponse(response)
   } catch (error) {
      console.error('금칙어를 생성하지 못했습니다.', error)
      throw error
   }
}

// 금칙어 삭제
export const deleteBanWord = async (wordId) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/ban-words/${wordId}`, {
         method: 'DELETE',
      })
      return handleResponse(response)
   } catch (error) {
      console.error('금칙어를 삭제하지 못했습니다.', error)
      throw error
   }
}

// 사이트 설정
export const fetchSiteSettings = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/settings`)
      return handleResponse(response)
   } catch (error) {
      console.error('사이트 설정을 불러오지 못했습니다.', error)
   }
}

// 사이트 설정 갱신
export const updateSiteSettings = async (settings) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/settings`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(settings),
      })
      return handleResponse(response)
   } catch (error) {
      console.error('사이트 세팅 갱신에 실패했습니다.', error)
      throw error
   }
}

// 교환품 생성
export const addReward = async (rewardData) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/rewards`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(rewardData),
      })
      return handleResponse(response)
   } catch (error) {
      console.error('교환품을 생성하지 못했습니다.', error)
      throw error
   }
}

// 교환품 수정
export const updateReward = async (rewardId, rewardData) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/rewards/${rewardId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(rewardData),
      })
      return handleResponse(response)
   } catch (error) {
      console.error('교환품을 수정하지 못했습니다.', error)
      throw error
   }
}

// 교환품 삭제
export const deleteReward = async (rewardId) => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/rewards/${rewardId}`, {
         method: 'DELETE',
      })
      return handleResponse(response)
   } catch (error) {
      console.error(`교환품을 삭제하지 못했습니다.`, error)
      throw error
   }
}

// 통계
export const fetchStatistics = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/statistics`)
      return handleResponse(response)
   } catch (error) {
      console.error('통계를 불러오지 못했습니다.', error)
      throw error
   }
}
