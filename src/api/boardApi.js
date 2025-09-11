import axiosApi from '.'
const env = import.meta.env.VITE_ENV

// 게시글 리스트 가져오기
export const getBoard = async () => {
   try {
      const response = await axiosApi.get('/board')
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 게시글 등록하기
export const writeBoard = async (boardData) => {
   try {
      const isFormData = boardData instanceof FormData

      const config = {}

      if (!isFormData) {
         config.headers = {
            'Content-Type': 'application/json',
         }
      }
      const response = await axiosApi.post('/board/write', boardData, config)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
