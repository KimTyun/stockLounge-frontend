import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { reportBoard, reportComment } from '../api/reportApi'

/**
 * 게시글 신고
 */
export const reportBoardThunk = createAsyncThunk('report/board', async (data, { rejectWithValue }) => {
   try {
      const { boardId, userId, reason } = data
      const response = await reportBoard(boardId, userId, reason)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 댓글 신고
 */
export const reportCommentThunk = createAsyncThunk('report/comment', async (data, { rejectWithValue }) => {
   try {
      const { commentId, userId, reason } = data
      const response = await reportComment(commentId, userId, reason)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const reportSlice = createSlice({
   name: 'reports',
   initialState: {
      loading: false,
      error: null,
      message: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(reportBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(reportBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
         })
         .addCase(reportBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 신고를 접수하지 못했습니다.'
         })
         .addCase(reportCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(reportCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
         })
         .addCase(reportCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 신고를 접수하지 못했습니다.'
         })
   },
})

export default reportSlice.reducer