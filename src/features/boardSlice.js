import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBoard, writeBoard, getBoardById, deleteBoard, updateBoard, likeBoard } from '../api/boardApi'

/**
 * 게시글 리스트 가져오기
 */
export const getBoardThunk = createAsyncThunk('board/list', async (category, { rejectWithValue }) => {
   try {
      const response = await getBoard(category)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 게시글 등록
 * boardData는 formData()객체형식으로 가져옴 : {board_img, category, content, createdAt, id, like_count, report_count, title, updatedAt}
 */
export const writeBoardThunk = createAsyncThunk('board/write', async (boardData, { rejectWithValue }) => {
   try {
      const response = await writeBoard(boardData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 특정 게시물 가져오기, id값으로 게시글 구분
 */
export const getBoardByIdThunk = createAsyncThunk('board/fetchItemById', async (id, { rejectWithValue }) => {
   try {
      const response = await getBoardById(id)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 게시글 삭제, id로 특정 게시글 구분
 */
export const deleteBoardThunk = createAsyncThunk('board/deleteBoard', async (id, { rejectWithValue }) => {
   try {
      await deleteBoard(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 게시글 수정, id로 특정 게시글 구분,
 * formData()객체형식으로 가져옴
 */
export const updateBoardThunk = createAsyncThunk('board/updateBoard', async (data, { rejectWithValue }) => {
   try {
      const { id, data: boardData } = data
      await updateBoard(id, boardData)
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 게시글 좋아요, id로 특정 게시글 구분,
 */
export const likeBoardThunk = createAsyncThunk('board/likeBoard', async (id, { rejectWithValue }) => {
   try {
      const response = await likeBoard(id)
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
      // 한 페이지에서 가져오다보니 로딩이 중첩되서 무한 로딩 발생
      // 상세 페이지의 로딩을 따로 두어 관리
      loadingDetail: false,
      error: null,
      ban: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
      // 게시글 리스트
         .addCase(getBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.data
         })
         .addCase(getBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 게시글을 가져오지 못했습니다.'
         })
         // 게시글 등록
         .addCase(writeBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(writeBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.success) {
               state.comment = action.payload.data
               // ban이 있다면
            } else {
               state.ban = {
                  type: action.payload.modalType,
                  message: action.payload.message,
               }
            }
         })
         .addCase(writeBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 게시글을 등록하지 못했습니다.'
         })
         // 특정 게시글
         .addCase(getBoardByIdThunk.pending, (state) => {
            state.loadingDetail = true
            state.error = null
         })
         .addCase(getBoardByIdThunk.fulfilled, (state, action) => {
            state.loadingDetail = false
            state.board = action.payload.data
         })
         .addCase(getBoardByIdThunk.rejected, (state, action) => {
            state.loadingDetail = false
            state.error = action.payload?.message || '서버 문제로 게시글을 가져오지 못했습니다.'
         })
         // 게시글 삭제
         .addCase(deleteBoardThunk.pending, (state) => {
            state.loadingDetail = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state) => {
            state.loadingDetail = false
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loadingDetail = false
            state.error = action.payload?.message || '서버 문제로 게시글을 삭제하지 못했습니다.'
         })
         // 게시글 수정
         .addCase(updateBoardThunk.pending, (state) => {
            state.loadingDetail = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state) => {
            state.loadingDetail = false
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loadingDetail = false
            state.error = action.payload?.message || '서버 문제로 게시글을 수정하지 못했습니다.'
         })
         // 게시글 좋아요
         .addCase(likeBoardThunk.pending, (state) => {
            state.loadingDetail = true
            state.error = null
         })
         .addCase(likeBoardThunk.fulfilled, (state, action) => {
            state.loadingDetail = false

            // 좋아요 누를시 반응 업데이트
            const updated = action.payload.data
            if (!updated) return
            if (state.board && state.board.id === updated.boardId) {
               state.board.like_count = updated.like_count
               state.board.isLiked = updated.isLiked
            }
            state.boards = state.boards.map((board) => (board.id === updated.boardId ? { ...board, like_count: updated.like_count, isLiked: updated.isLiked } : board))
         })
         .addCase(likeBoardThunk.rejected, (state, action) => {
            state.loadingDetail = false
            state.error = action.payload?.message || '서버 문제로 게시글을 수정하지 못했습니다.'
         })
   },
})

export default boardSlice.reducer
