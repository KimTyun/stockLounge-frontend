import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkAuthStatus, logout } from '../api/authApi'

/**
 * 로그인 확인
 */
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 로그아웃
 */
export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
   try {
      const response = await logout()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isLoggedIn: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data
            state.isLoggedIn = action.payload.isLoggedIn
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 로그인 확인에 실패하였습니다.'
         })

         .addCase(logoutThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = null
            state.isLoggedIn = false
         })
         .addCase(logoutThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 로그인 확인에 실패하였습니다.'
         })
   },
})

export default authSlice.reducer
