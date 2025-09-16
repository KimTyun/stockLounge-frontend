import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as adminApi from '../api/adminApi'

// 사용자 제재 갱신
export const updateUserStatusThunk = createAsyncThunk('admin/updateUserBanStatus', async ({ userId, isBanned }, { rejectWithValue }) => {
   try {
      await adminApi.updateUserBanStatus(userId, isBanned)
      return { userId, isBanned }
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 사용자 삭제
export const deleteUserThunk = createAsyncThunk('admin/deleteUser', async (userId, { rejectWithValue }) => {
   try {
      await adminApi.deleteUser(userId)
      return userId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 게시판 삭제
export const deleteBoardThunk = createAsyncThunk('admin/deleteBoard', async (boardId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBoard(boardId)
      return boardId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 사이트 관리
export const getSiteSettingsThunk = createAsyncThunk('admin/getSiteSettings', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getSiteSettings()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 사이트 설정 수정
export const updateSiteSettingsThunk = createAsyncThunk('admin/updateSiteSettings', async (settings, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateSiteSettings(settings)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금칙어 관리
export const getBanWordsThunk = createAsyncThunk('admin/getBanWords', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getBanWords()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금칙어 생성
export const addBanWordThunk = createAsyncThunk('admin/addBanWord', async (word, { rejectWithValue }) => {
   try {
      const response = await adminApi.addBanWord(word)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금칙어 삭제
export const deleteBanWordThunk = createAsyncThunk('admin/deleteBanWord', async (wordId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBanWord(wordId)
      return wordId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 생성
export const addRewardThunk = createAsyncThunk('admin/addReward', async (rewardData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addReward(rewardData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 수정
export const updateRewardThunk = createAsyncThunk('admin/updateReward', async ({ rewardId, rewardData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateReward(rewardId, rewardData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 삭제
export const deleteRewardThunk = createAsyncThunk('admin/deleteReward', async (rewardId, { rejectWithValue }) => {
   try {
      await adminApi.deleteReward(rewardId)
      return rewardId
   } catch (error) {
      return rejectWithValue(error.response?.data)
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
      token: null,
   },
   reducers: {
      clearError: (state) => {
         state.error = null
      },

      loginSuccess: (state, action) => {
         state.token = action.payload
         state.loading = false
         state.error = null
      },
      logout: (state) => {
         state.token = null
         state.users = []
         state.boards = []
         state.settings = null
         state.banWords = []
         state.rewards = []
         state.loading = false
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 사용자 제재
         .addCase(updateUserStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateUserStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            const { userId, isBanned } = action.payload
            const userIndex = state.users.findIndex((user) => user.id === userId)
            if (userIndex !== -1) {
               state.users[userIndex].is_ban = isBanned
            }
         })
         .addCase(updateUserStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사용자를 제재하지 못했습니다.'
         })

         // 게시판 삭제
         .addCase(deleteBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = state.boards.filter((board) => board.id !== action.payload)
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '게시판을 삭제하지 못했습니다.'
         })

         // 사이트 설정
         .addCase(getSiteSettingsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getSiteSettingsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         .addCase(getSiteSettingsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사이트 설정을 불러오지 못했습니다.'
         })

         // 사이트 설정 수정
         .addCase(updateSiteSettingsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateSiteSettingsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         .addCase(updateSiteSettingsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사이트 설정을 수정하지 못했습니다.'
         })

         // 금칙어 조회
         .addCase(getBanWordsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getBanWordsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = action.payload
         })
         .addCase(getBanWordsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '금칙어를 조회하지 못했습니다.'
         })

         // 금칙어 생성
         .addCase(addBanWordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addBanWordThunk.fulfilled, (state, action) => {
            state.loading = false
            state.banWords.push(action.payload)
         })
         .addCase(addBanWordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '금칙어를 추가하지 못했습니다.'
         })

         // 금칙어 삭제
         .addCase(deleteBanWordThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBanWordThunk.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = state.banWords.filter((word) => word.id !== action.payload)
         })
         .addCase(deleteBanWordThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '금칙어를 삭제하지 못했습니다.'
         })

         // 교환품 추가
         .addCase(addRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addRewardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.rewards.push(action.payload)
         })
         .addCase(addRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 추가하지 못했습니다.'
         })

         // 교환품 수정
         .addCase(updateRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateRewardThunk.fulfilled, (state, action) => {
            state.loading = false
            const updatedReward = action.payload
            const rewardIndex = state.rewards.findIndex((reward) => reward.id === updatedReward.id)
            if (rewardIndex !== -1) {
               state.rewards[rewardIndex] = updatedReward
            }
         })
         .addCase(updateRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 수정하지 못했습니다.'
         })

         // 교환품 삭제
         .addCase(deleteRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteRewardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.rewards = state.rewards.filter((reward) => reward.id !== action.payload)
         })
         .addCase(deleteRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 수정하지 못했습니다.'
         })
   },
})

export default adminSlice.reducer
