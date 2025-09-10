import axiosApi from '.'

export const getCryptoNews = async (length = 10) => {
   const response = await axiosApi.get('/news/crypto', { params: { length } })
   return response.data
}

export const getEconomyNews = async (length = 10) => {
   const response = await axiosApi.get('/news/economy', { params: { length } })
   return response.data
}
