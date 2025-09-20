import upbitApi from '.'
const env = import.meta.env.VITE_ENV

// 코인 리스트 가져오기, 호가 상위 n개를 가져온다. 기본 15개
export const getTickerAll = async (n = 15) => {
   try {
      const response = await upbitApi.get('/upbit/list', {
         params: {
            n,
         },
      })

      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 코인 이름 가져오기(코인 한글 이름을 가져오는 용도)
export const getMarketAll = async () => {
   try {
      const response = await upbitApi.get('upbit/markets')

      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}

// 캔들차트 데이터 가져오기
export const getCandles = async (time = 'days', params) => {
   try {
      const response = await upbitApi.get(`upbit/candles`, {
         params: {
            time,
            market: params.market,
            count: params.count,
         },
      })

      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
