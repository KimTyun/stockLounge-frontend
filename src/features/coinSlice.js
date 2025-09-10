import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMarketAll, getTickerAll } from '../api/upbitApi'

export const getMarketAllThunk = createAsyncThunk('coin/getMarketAll', async (_, { rejectWithValue }) => {
   try {
      const response = await getMarketAll()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

export const getTickerAllThunk = createAsyncThunk('coin/getTickkerAll', async (n, { rejectWithValue }) => {
   try {
      const response = await getTickerAll(n)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const coinSlice = createSlice({
   name: 'coin',
   initialState: {
      //모든 코인 거래쌍,이름 리스트([{pair:KRW-BTC, name:비트코인}, ...])
      coinList: [],
      //코인 데이터 리스트
      coins: [],
      //차트에 사용할 캔들 데이터
      data: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (b) => {
      b.addCase(getMarketAllThunk.pending, (s) => {
         s.loading = true
         s.error = null
      })
         .addCase(getMarketAllThunk.fulfilled, (s, a) => {
            s.loading = false
            s.coinList = a.payload.map((e) => ({
               pair: e.market,
               name: e.korean_name,
            }))
            s.error = null
         })
         .addCase(getMarketAllThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload?.message || '서버 문제로 코인 리스트를 불러오지 못했습니다.'
         })

         .addCase(getTickerAllThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(getTickerAllThunk.fulfilled, (s, a) => {
            s.loading = false
            s.coins = a.payload
            s.error = null
         })
         .addCase(getTickerAllThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload?.message || '서버 문제로 코인 리스트를 불러오지 못했습니다.'
         })
   },
})

export default coinSlice.reducer
