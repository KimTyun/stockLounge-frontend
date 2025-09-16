import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as adminApi from '../api/adminApi'

// 사용자 제재 갱신
export const updateUserStatus = createAsyncThunk('admin/updateUserBanStatus', async ({ userId, isBanned }, { rejectWithValue }) => {
   try {
      await adminApi.updateUserBanStatus(userId, isBanned)
      return { userId, isBanned }
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 사용자 삭제
export const deleteUserAsync = createAsyncThunk('admin/deleteUser', async (userId, { rejectWithValue }) => {
   try {
      await adminApi.deleteUser(userId)
      return userId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 게시판 삭제
export const deleteBoardAsync = createAsyncThunk('admin/deleteBoard', async (boardId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBoard(boardId)
      return boardId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// // 사이트 관리
// export const getSiteSettings = createAsyncThunk('admin/getSiteSettings', async (_, { rejectWithValue }) => {
//    try {
//       const response = await adminApi.getSiteSettings()
//       return response
//    } catch (error) {
//       return rejectWithValue(error.response?.data)
//    }
// })

// // 사이트 설정 수정
// export const updateSiteSettings = createAsyncThunk('admin/updateSiteSettings', async (settings, { rejectWithValue }) => {
//    try {
//       const response = await adminApi.updateSiteSettings(settings)
//       return response
//    } catch (error) {
//       return rejectWithValue(error.response?.data)
//    }
// })

// 금칙어 관리
export const getBanWords = createAsyncThunk('admin/getBanWords', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getBanWords()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금칙어 생성
export const addBanWordAsync = createAsyncThunk('admin/addBanWord', async (word, { rejectWithValue }) => {
   try {
      const response = await adminApi.addBanWord(word)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금칙어 삭제
export const deleteBanWordAsync = createAsyncThunk('admin/deleteBanWord', async (wordId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBanWord(wordId)
      return wordId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 목록
export const getRewards = createAsyncThunk('admin/getRewards', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getRewards()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 생성
export const addRewardAsync = createAsyncThunk('admin/addReward', async (rewardData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addReward(rewardData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 수정
export const updateRewardAsync = createAsyncThunk('admin/updateReward', async ({ rewardId, rewardData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateReward(rewardId, rewardData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 삭제
export const deleteRewardAsync = createAsyncThunk('admin/deleteReward', async (rewardId, { rejectWithValue }) => {
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
      // ✨ loginSuccess 액션 추가
      loginSuccess: (state, action) => {
         state.token = action.payload // payload로 받은 토큰을 상태에 저장
         state.loading = false
         state.error = null
      },
      // ✨ 로그아웃 액션
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
         // 사용자
         .addCase(getUsers.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
         })
         .addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사용자 정보를 불러오지 못했습니다.'
         })

         // 사용자 제재
         .addCase(updateUserStatus.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateUserStatus.fulfilled, (state, action) => {
            state.loading = false
            const { userId, isBanned } = action.payload
            const userIndex = state.users.findIndex((user) => user.id === userId)
            if (userIndex !== -1) {
               state.users[userIndex].is_ban = isBanned
            }
         })
         .addCase(updateUserStatus.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사용자를 제재하지 못했습니다.'
         })

         // 게시판 조회
         .addCase(getBoards.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getBoards.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload
         })
         .addCase(getBoards.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '게시판을 불러오지 못했습니다.'
         })

         // 게시판 삭제
         .addCase(deleteBoardAsync.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardAsync.fulfilled, (state, action) => {
            state.loading = false
            state.boards = state.boards.filter((board) => board.id !== action.payload)
         })
         .addCase(deleteBoardAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '게시판을 삭제하지 못했습니다.'
         })

         // 사이트 설정
         .addCase(getSiteSettings.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getSiteSettings.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         .addCase(getSiteSettings.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사이트 설정을 불러오지 못했습니다.'
         })

         // 사이트 설정 수정
         .addCase(updateSiteSettings.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateSiteSettings.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
         })
         .addCase(updateSiteSettings.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '사이트 설정을 수정하지 못했습니다.'
         })

         // 금칙어 조회
         .addCase(getBanWords.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getBanWords.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = action.payload
         })
         .addCase(getBanWords.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '금칙어를 조회하지 못했습니다.'
         })

         // 금칙어 생성
         .addCase(addBanWordAsync.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addBanWordAsync.fulfilled, (state, action) => {
            state.loading = false
            state.banWords.push(action.payload)
         })
         .addCase(addBanWordAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '금칙어를 추가하지 못했습니다.'
         })

         // 금칙어 삭제
         .addCase(deleteBanWordAsync.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBanWordAsync.fulfilled, (state, action) => {
            state.loading = false
            state.banWords = state.banWords.filter((word) => word.id !== action.payload)
         })
         .addCase(deleteBanWordAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '금칙어를 삭제하지 못했습니다.'
         })

         // 교환품 조회
         .addCase(getRewards.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getRewards.fulfilled, (state, action) => {
            state.loading = false
            state.rewards = action.payload
         })
         .addCase(getRewards.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 불러오지 못했습니다.'
         })

         // 교환품 추가
         .addCase(addRewardAsync.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addRewardAsync.fulfilled, (state, action) => {
            state.loading = false
            state.rewards.push(action.payload)
         })
         .addCase(addRewardAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 추가하지 못했습니다.'
         })

         // 교환품 수정
         .addCase(updateRewardAsync.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateRewardAsync.fulfilled, (state, action) => {
            state.loading = false
            const updatedReward = action.payload
            const rewardIndex = state.rewards.findIndex((reward) => reward.id === updatedReward.id)
            if (rewardIndex !== -1) {
               state.rewards[rewardIndex] = updatedReward
            }
         })
         .addCase(updateRewardAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 수정하지 못했습니다.'
         })

         // 교환품 삭제
         .addCase(deleteRewardAsync.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteRewardAsync.fulfilled, (state, action) => {
            state.loading = false
            state.rewards = state.rewards.filter((reward) => reward.id !== action.payload)
         })
         .addCase(deleteRewardAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '교환품을 수정하지 못했습니다.'
         })
   },
})

export default adminSlice.reducer
