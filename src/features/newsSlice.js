import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCryptoNews, getEconomyNews } from '../api/naverApi'

/**
 * 코인 뉴스 가져오기
 * length : 가져올 개수
 */
export const getCryptoNewsThunk = createAsyncThunk('news/getCryptoNews', async (length, { rejectWithValue }) => {
   try {
      const response = await getCryptoNews(length)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 경제 뉴스 가져오기
 * length : 가져올 개수
 */
export const getEconomyNewsThunk = createAsyncThunk('news/getEconomyNews', async (length, { rejectWithValue }) => {
   try {
      const response = await getEconomyNews(length)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const newsSlice = createSlice({
   name: 'news',
   initialState: {
      news: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCryptoNewsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getCryptoNewsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.news = action.payload.data
            state.error = null
         })
         .addCase(getCryptoNewsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 뉴스를 가져오지 못했습니다.'
         })

         .addCase(getEconomyNewsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getEconomyNewsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.news = action.payload.data
            state.error = null
         })
         .addCase(getEconomyNewsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 뉴스를 가져오지 못했습니다.'
         })
   },
})

export default newsSlice.reducer
