import axiosApi from '.'

export const getBoard = async () => {
   try {
      const response = await axiosApi.get('/board')
      return response.data
   } catch (error) {
      console.error('게시글 리스트 가져오기 실패', error)
   }
}

export const writeBoard = async (boardData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await axiosApi.post('/board/write', boardData, config)
      return response.data
   } catch (error) {
      console.error('게시글 등록 실패!')
   }
}
