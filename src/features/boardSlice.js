import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBoard, writeBoard } from '../api/boardApi'

/**
 * 게시글 리스트 가져오기
 */
export const getBoardThunk = createAsyncThunk('board/list', async (__dirname, { rejectWithValue }) => {
   try {
      const response = await getBoard()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 게시글 등록
 * boardData : {board_img, category, content, createdAt, id, like_count, report_count, title, updatedAt}
 */
export const writeBoardThunk = createAsyncThunk('board/write', async (boardData, { rejectWithValue }) => {
   try {
      const response = await writeBoard(boardData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const boardSlice = createSlice({
   name: 'boards',
   initialState: {
      board: null,
      boards: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.data.boards
         })
         .addCase(getBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 게시글을 가져오지 못했습니다.'
         })
      builder
         .addCase(writeBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(writeBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload.data.board
         })
         .addCase(writeBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 게시글을 등록하지 못했습니다.'
         })
   },
})

export default boardSlice.reducer
