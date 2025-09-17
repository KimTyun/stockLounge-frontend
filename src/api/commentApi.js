import axiosApi from '.'
const env = import.meta.env.VITE_ENV

// 댓글 등록
export const createComment = async (commentData) => {
   try {
      const response = await axiosApi.post(`/board/${commentData.board_id}/comment`, commentData)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 댓글 가져오기
export const listComment = async (boardId) => {
   try {
      const response = await axiosApi.get(`/board/${boardId}/comments`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 댓글 삭제
export const deleteComment = async ({ boardId, commentId }) => {
   try {
      const response = await axiosApi.delete(`/board/${boardId}/comment/${commentId}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 댓글 추천
export const likeComment = async (id, userId = null) => {
   try {
      const response = await axiosApi.post(`/board/${id}/comment/like`, {
         user_id: userId,
      })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
