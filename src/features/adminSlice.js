import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as adminApi from '../api/adminApi'

const initialState = {
   users: [],
   boards: [],
   settings: null,
   banWords: [],
   rewards: [],
   loading: false,
   error: null,
}

// 사용자 관리
export const fetchUsersAsync = createAsyncThunk('admin/fetchUsers', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.fetchUsers()
      return response.users
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 게시판 관리
export const fetchBoardsAsync = createAsyncThunk('admin/fetchBoards', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.fetchBoards()
      return response.boards
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 게시판 삭제
export const deleteBoardAsync = createAsyncThunk('admin/deleteBoard', async (boardId, { rejectWithValue, dispatch }) => {
   try {
      await adminApi.deleteBoard(boardId)
      // 삭제 성공하면 게시판 상태 갱신
      dispatch(fetchBoardsAsync())
      return boardId
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 사이트 관리
export const fetchSiteSettingsAsync = createAsyncThunk('admin/fetchSiteSettings', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.fetchSiteSettings()
      return response.settings
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 사이트 설정 수정
export const updateSiteSettingsAsync = createAsyncThunk('admin/updateSiteSettings', async (settings, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateSiteSettings(settings)
      return response.settings
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 금칙어 관리
export const fetchBanWordsAsync = createAsyncThunk('admin/fetchBanWords', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.fetchBanWords()
      return response.banWords
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 금칙어 생성
export const addBanWordAsync = createAsyncThunk('admin/addBanWord', async (word, { rejectWithValue, dispatch }) => {
   try {
      const response = await adminApi.addBanWord(word)
      dispatch(fetchBanWordsAsync())
      return response.banWord
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 금칙어 삭제
export const deleteBanWordAsync = createAsyncThunk('admin/deleteBanWord', async (wordId, { rejectWithValue, dispatch }) => {
   try {
      await adminApi.deleteBanWord(wordId)
      dispatch(fetchBanWordsAsync())
      return wordId
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 사용자 제재 갱신
export const updateUserBanStatusAsync = createAsyncThunk('admin/updateUserBanStatus', async ({ userId, isBanned }, { rejectWithValue, dispatch }) => {
   try {
      await adminApi.updateUserBanStatus(userId, isBanned)
      dispatch(fetchUsersAsync())
      return { userId, isBanned }
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 목록
export const fetchRewardsAsync = createAsyncThunk('admin/fetchRewards', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.fetchRewards()
      return response.rewards
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 생성
export const addRewardAsync = createAsyncThunk('admin/addReward', async (rewardData, { rejectWithValue, dispatch }) => {
   try {
      const response = await adminApi.addReward(rewardData)
      dispatch(fetchRewardsAsync())
      return response.reward
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 수정
export const updateRewardAsync = createAsyncThunk('admin/updateReward', async ({ rewardId, rewardData }, { rejectWithValue, dispatch }) => {
   try {
      const response = await adminApi.updateReward(rewardId, rewardData)
      dispatch(fetchRewardsAsync())
      return response.reward
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 삭제
export const deleteRewardAsync = createAsyncThunk('admin/deleteReward', async (rewardId, { rejectWithValue, dispatch }) => {
   try {
      await adminApi.deleteReward(rewardId)
      dispatch(fetchRewardsAsync())
      return rewardId
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

const adminSlice = createSlice({
   name: 'admin',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
               state.loading = true
               state.error = null
            }
         )
         .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
               state.loading = false
               state.error = action.payload || '알 수 없는 에러가 발생했습니다.'
            }
         )
         // 사용자
         .addCase(fetchUsersAsync.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
         })
         // 게시판
         .addCase(fetchBoardsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload
         })
         //사이트 설정
         .addCase(fetchSiteSettingsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         //사이트 설정 수정
         .addCase(updateSiteSettingsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         //금칙어
         .addCase(fetchBanWordsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = action.payload
         })
         //교환품
         .addCase(fetchRewardsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.rewards = action.payload
         })
         // 게시글 삭제 성공 시, Redux 상태에서 해당 게시글 즉시 제거하고 UI 업데이트.
         .addCase(deleteBoardAsync.fulfilled, (state, action) => {
            state.loading = false
            state.boards = state.boards.filter((board) => board.id !== action.payload)
         })
   },
})
