import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBoard, writeBoard } from '../api/board'

// 게시글 리스트 가져오기
export const getBoardThunk = createAsyncThunk('board/list', async (__dirname, { rejectWithValue }) => {
   try {
      const response = await getBoard()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 게시글 등록
export const writeBoardThunk = createAsyncThunk('board/write', async (boardData, { rejectWithValue }) => {
   try {
      const response = await writeBoard(boardData)
      return response.data.board
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
            state.boards = action.payload.boards
         })
         .addCase(getBoardThunk.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
         })
      builder
         .addCase(writeBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(writeBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(writeBoardThunk.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
