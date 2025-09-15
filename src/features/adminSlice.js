import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as adminApi from '../api/adminApi'

// 사용자 관리
export const getUsersAsync = createAsyncThunk('admin/getUsers', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getUsers()
      return response.users
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 게시판 관리
export const getBoardsAsync = createAsyncThunk('admin/getBoards', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getBoards()
      return response.boards
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 게시판 삭제
export const deleteBoardAsync = createAsyncThunk('admin/deleteBoard', async (boardId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBoard(boardId)
      return boardId
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 사이트 관리
export const getSiteSettingsAsync = createAsyncThunk('admin/getSiteSettings', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getSiteSettings()
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
export const getBanWordsAsync = createAsyncThunk('admin/getBanWords', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getBanWords()
      return response.banWords
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 금칙어 생성
export const addBanWordAsync = createAsyncThunk('admin/addBanWord', async (word, { rejectWithValue }) => {
   try {
      const response = await adminApi.addBanWord(word)
      return response.banWord
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 금칙어 삭제
export const deleteBanWordAsync = createAsyncThunk('admin/deleteBanWord', async (wordId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBanWord(wordId)
      return wordId
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 사용자 제재 갱신
export const updateUserBanStatusAsync = createAsyncThunk('admin/updateUserBanStatus', async ({ userId, isBanned }, { rejectWithValue }) => {
   try {
      await adminApi.updateUserBanStatus(userId, isBanned)
      return { userId, isBanned }
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 목록
export const getRewardsAsync = createAsyncThunk('admin/getRewards', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getRewards()
      return response.rewards
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 생성
export const addRewardAsync = createAsyncThunk('admin/addReward', async (rewardData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addReward(rewardData)
      return response.reward
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 수정
export const updateRewardAsync = createAsyncThunk('admin/updateReward', async ({ rewardId, rewardData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateReward(rewardId, rewardData)
      return response.reward
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

// 교환품 삭제
export const deleteRewardAsync = createAsyncThunk('admin/deleteReward', async (rewardId, { rejectWithValue }) => {
   try {
      await adminApi.deleteReward(rewardId)
      return rewardId
   } catch (error) {
      return rejectWithValue(error.message)
   }
})

const adminSlice = createSlice({
   name: 'admin',
   initialState: {
      users: [],
      boards: [],
      settings: null,
      banWords: [],
      rewards: [],
      loading: false,
      error: null,
   },
   reducers: {
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         //.pending 공통 로직
         .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
               state.loading = true
               state.error = null
            }
         )
         //.rejected 공통 로직
         .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
               state.loading = false
               state.error = action.payload || '알 수 없는 에러가 발생했습니다.'
            }
         )
         // 사용자
         .addCase(getUsersAsync.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
         })
         //사용자 제재
         .addCase(updateUserBanStatusAsync.fulfilled, (state, action) => {
            state.loading = false
            const { userId, isBanned } = action.payload
            const userIndex = state.users.findIndex((user) => user.id === userId)
            if (userIndex !== -1) {
               state.users[userIndex].isban = isBanned
            }
         })
         // 게시판 조회
         .addCase(getBoardsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload
         })
         //게시판 삭제
         .addCase(deleteBoardAsync.fulfilled, (state, action) => {
            state.loading = false
            state.boards = state.boards.filter((board) => board.id !== action.payload)
         })
         //사이트 설정
         .addCase(getSiteSettingsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         //사이트 설정 수정
         .addCase(updateSiteSettingsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         //금칙어 조회
         .addCase(getBanWordsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = action.payload
         })
         //금칙어 생성
         .addCase(addBanWordAsync.fulfilled, (state, action) => {
            state.loading = false
            // 새 금칙어 추가
            state.banWords.push(action.payload)
         })
         //금칙어 삭제
         .addCase(deleteBanWordAsync.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = state.banWords.filter((word) => word.id !== action.payload)
         })
         //교환품 조회
         .addCase(getRewardsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.rewards = action.payload
         })
         //교환품 추가
         .addCase(addRewardAsync.fulfilled, (state, action) => {
            state.loading = false
            // 새 교환품 추가
            state.rewards.push(action.payload)
         })
         //교환품 수정
         .addCase(updateRewardAsync.fulfilled, (state, action) => {
            state.loading = false
            // 교환품 조회로 불러온 거 업뎃
            const updatedReward = action.payload
            const rewardIndex = state.rewards.findIndex((reward) => reward.id === updatedReward.id)
            if (rewardIndex !== -1) {
               state.rewards[rewardIndex] = updatedReward
            }
         })
         //교환품 삭제
         .addCase(deleteRewardAsync.fulfilled, (state, action) => {
            state.loading = false
            // 배열에서 교환품 삭제
            state.rewards = state.rewards.filter((reward) => reward.id !== action.payload)
         })
   },
})

export default adminSlice.reducer
