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

// 회원관리
export const fetchUsers = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/admin/user/`)
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
      console.error(`사용자(ID:${userId})를 불러오지 못했습니다.`, error)
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
      console.error(`사용자(ID:${userId})를 제재하지 못했습니다.`, error)
      throw error
   }
}
