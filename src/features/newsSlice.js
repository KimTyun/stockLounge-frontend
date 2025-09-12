import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getNews } from '../api/naverApi'

/**
 * 뉴스 가져오기
 * length 가져올 뉴스 개수
 * query 검색어
 * start 오프셋
 */
export const getNewsThunk = createAsyncThunk('news/getNews', async ({ length, query, start }, { rejectWithValue }) => {
   try {
      const response = await getNews(length, query, start)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const newsSlice = createSlice({
   name: 'news',
   initialState: {
      news: {},
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder

         .addCase(getNewsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getNewsThunk.fulfilled, (state, action) => {
            const { query, data, start } = action.payload

            if (Number(start) === 1 || !state.news[query]) {
               state.news[query] = data
            } else {
               state.news[query] = {
                  ...state.news[query],
                  ...data,
                  items: [...state.news[query].items, ...data.items],
               }
            }
            state.loading = false
            state.error = null
         })
         .addCase(getNewsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 뉴스를 가져오지 못했습니다.'
         })
   },
})

export default newsSlice.reducer
