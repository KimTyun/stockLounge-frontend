import axios from 'axios'

const baseURL = import.meta.env.VITE_UPBIT_URI
const env = import.meta.env.VITE_ENV
const upbitApi = axios.create({
   baseURL,
   headers: {
      accept: 'application/json',
   },
})

// 코인 리스트 가져오기, 호가 상위 n개를 가져온다. 기본 15개
export const getTickerAll = async (n = 15) => {
   const response = await upbitApi.get('ticker/all', {
      params: {
         quote_currencies: 'KRW',
      },
   })

   return response.data.sort((a, b) => Number(b.trade_price) - Number(a.trade_price)).slice(0, n)
}

// 코인 이름 가져오기(코인 한글 이름을 가져오는 용도)
export const getMarketAll = async () => {
   const response = await upbitApi.get('market/all', {
      params: {
         is_details: false,
      },
   })
   return response.data
}

// 캔들차트 데이터 가져오기
export const getCandles = async (time = 'days', params) => {
   try {
      const response = await upbitApi.get(`candles/${time}`, {
         params: {
            ...params,
            converting_price_unit: 'KRW',
         },
      })
      return response.data
   } catch (error) {
      if (env === 'development') console.error(error)
      throw error
   }
}
