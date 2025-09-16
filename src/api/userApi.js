import axiosApi from '.'
const env = import.meta.env.VITE_ENV

//유저 리스트 가져오기
export const getUsers = async (limit = 10, page = 1) => {
   try {
      const response = await axiosApi.get('/users/', { params: { limit, page } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//유저 정보 가져오기
export const getUserById = async (id) => {
   try {
      const response = await axiosApi.get(`/users/${id}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//내정보 가져오기
export const getMe = async () => {
   try {
      const response = await axiosApi.get(`/users/me`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//내정보 수정하기
export const updateMe = async ({ name, pw, age }) => {
   try {
      const response = await axiosApi.put(`/users/me`, { name, pw, age })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//프로필사진 수정하기
export const updateMyProfile = async (formData) => {
   try {
      const response = await axiosApi.put(`/users/me/profile-img`, formData, {
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

//내 작성글 목록 가져오기
export const getMyPosts = async (limit = 10, page = 1) => {
   try {
      const response = await axiosApi.get(`/users/me/posts`, { params: { limit, page } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//내 작성 댓글 목록 가져오기
export const getMyComments = async (limit = 10, page = 1) => {
   try {
      const response = await axiosApi.get(`/users/me/comments`, { params: { limit, page } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//포인트 기록 가져오기
export const getMyReward = async (limit = 10, page = 1) => {
   try {
      const response = await axiosApi.get(`/users/me/reward`, { params: { limit, page } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
