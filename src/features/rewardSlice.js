import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getRewards } from '../api/reward'

/**
 * 리워드 리스트 전부 가져오기
 */
export const getRewardsThunk = createAsyncThunk('reward/getRewards', async (_, { rejectWithValue }) => {
   try {
      const response = await getRewards()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const rewardSlice = createSlice({
   name: 'reward',
   initialState: {
      rewards: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder

         .addCase(getRewardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getRewardsThunk.fulfilled, (state, action) => {
            state.rewards = action.payload.data
            state.loading = false
            state.error = null
         })
         .addCase(getRewardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 리워드를 가져오지 못하였습니다.'
         })
   },
})

export default rewardSlice.reducer
