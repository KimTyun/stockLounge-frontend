import axiosApi from '.'
const env = import.meta.env.VITE_ENV

// 게시글 신고
export const reportBoard = async (boardId, userId, reason) => {
   try {
      const response = await axiosApi.post(`/report/board/${boardId}`, {
         user_id: userId,
         reason: reason,
      })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 댓글 신고
export const reportComment = async (commentId, userId, reason) => {
   try {
      const response = await axiosApi.post(`/report/comment/${commentId}`, {
         user_id: userId,
         reason: reason,
      })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
