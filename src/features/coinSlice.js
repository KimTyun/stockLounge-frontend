import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCandles, getMarketAll, getTickerAll } from '../api/upbitApi'

/**
 * upbit의 코인 목록 가져오기
 */
export const getMarketAllThunk = createAsyncThunk('coin/getMarketAll', async (_, { rejectWithValue }) => {
   try {
      const response = await getMarketAll()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 코인 정보 가져오기
 * n : 가져올 개수, 기본 15개
 */
export const getTickerAllThunk = createAsyncThunk('coin/getTickerAll', async (n, { rejectWithValue }) => {
   try {
      const response = await getTickerAll(n)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 코인 캔들차트데이터 가져오기
 * data : time - days/ weeks/ months 등..
 * params : {market(거래쌍), count(가져올 개수)}
 */
export const getcandlesThunk = createAsyncThunk('coin/getcandles', async (data, { rejectWithValue }) => {
   try {
      const response = await getCandles(data.time, data.params)
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
      data: {},
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getMarketAllThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getMarketAllThunk.fulfilled, (state, action) => {
            state.loading = false
            state.coinList = action.payload.map((e) => ({
               pair: e.market,
               name: e.korean_name,
            }))
            state.error = null
         })
         .addCase(getMarketAllThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 코인 리스트를 불러오지 못했습니다.'
         })

         .addCase(getTickerAllThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getTickerAllThunk.fulfilled, (state, action) => {
            state.loading = false
            state.coins = action.payload
            state.error = null
         })
         .addCase(getTickerAllThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 코인 리스트를 불러오지 못했습니다.'
         })

         .addCase(getcandlesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getcandlesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data = { ...state.data, [action.payload[0].market]: action.payload }
            state.error = null
         })
         .addCase(getcandlesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 코인 리스트를 불러오지 못했습니다.'
         })
   },
})

export default coinSlice.reducer
