import axios from 'axios'

const baseURL = import.meta.env.VITE_UPBIT_URI

const upbitApi = axios.create({
   baseURL,
   headers: {
      accept: 'application/json',
   },
})

/**업비트에서 원화 통화 코드를 지원하는 모든 코인의 현재가 조회,
 * 조회는 전체조회만 되지만 n를 넣어서 필요한 숫자만 반환받을 수 있음
 * @param n 현재가 기준으로 상위 n개를 가져옴 기본값 15,
 */
export const getTickerAll = async (n = 15) => {
   const response = await upbitApi.get('ticker/all', {
      params: {
         quote_currencies: 'KRW',
      },
   })

   return response.data.sort((a, b) => Number(b.trade_price) - Number(a.trade_price)).slice(0, n)
}

export const getMarketAll = async () => {
   const response = await upbitApi.get('market/all', {
      params: {
         is_details: false,
      },
   })
   return response.data
}
