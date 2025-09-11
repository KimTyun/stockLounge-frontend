import axiosApi from '.'
const env = import.meta.env.VITE_ENV

//코인 뉴스 가져오기
export const getCryptoNews = async (length = 10) => {
   try {
      const response = await axiosApi.get('/news/crypto', { params: { length } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
//경제 뉴스 가져오기
export const getEconomyNews = async (length = 10) => {
   try {
      const response = await axiosApi.get('/news/economy', { params: { length } })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
