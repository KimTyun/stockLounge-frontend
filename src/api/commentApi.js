import axiosApi from '.'
const env = import.meta.env.VITE_ENV

// 댓글 등록
export const createComment = async (commentData) => {
   try {
      const response = await axiosApi.post('/comment', commentData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 댓글 가져오기
export const listComment = async (id) => {
   try {
      const response = await axiosApi.get(`/comment/${id}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 댓글 삭제
export const deleteComment = async (id) => {
   try {
      const response = await axiosApi.delete(`/comment/${id}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
