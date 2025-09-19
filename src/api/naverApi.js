import axiosApi from '.'
const env = import.meta.env.VITE_ENV

//뉴스 가져오기
export const getNews = async (length = 10, query = '암호화폐', start = 1, lastLink) => {
   try {
      const response = await axiosApi.get('/news/', { params: { length, query, start, lastLink } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
