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
      const response = await axiosApi.post('/board/write', boardData, {
         // headers로 감싸서 폼데이터 형식으로 보냄
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

// 특정 게시글 가져오기
export const getBoardById = async (id) => {
   try {
      const response = await axiosApi.get(`/board/${id}`)
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
