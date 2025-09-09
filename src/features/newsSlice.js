import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCryptoNews, getEconomyNews } from '../api/naverApi'

export const getCryptoNewsThunk = createAsyncThunk('news/getCryptoNews', async (length, { rejectWithValue }) => {
   try {
      const response = await getCryptoNews(length)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

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
   extraReducers: (b) => {
      b.addCase(getCryptoNewsThunk.pending, (s) => {
         s.loading = true
         s.error = null
      })
         .addCase(getCryptoNewsThunk.fulfilled, (s, a) => {
            s.loading = false
            s.news = a.payload.data
            s.error = null
         })
         .addCase(getCryptoNewsThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload?.message || '서버문제로 뉴스를 가져오지 못했습니다.'
         })

         .addCase(getEconomyNewsThunk.pending, (s) => {
            s.loading = true
            s.error = null
         })
         .addCase(getEconomyNewsThunk.fulfilled, (s, a) => {
            s.loading = false
            s.news = a.payload.data
            s.error = null
         })
         .addCase(getEconomyNewsThunk.rejected, (s, a) => {
            s.loading = false
            s.error = a.payload?.message || '서버문제로 뉴스를 가져오지 못했습니다.'
         })
   },
})

export default newsSlice.reducer
