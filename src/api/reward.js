import axiosApi from '.'
const env = import.meta.env.VITE_ENV

//리워드 리스트 가져오기
export const getRewards = async () => {
   try {
      const response = await axiosApi.get('/reward/')
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//코인 교환하기
export const exchangeCoin = async (count) => {
   try {
      const response = await axiosApi.put('/reward/coin', { count })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

//리워드 교환하기
export const exchangeReward = async (rewardId) => {
   try {
      const response = await axiosApi.put('/reward/reward', { rewardId })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
