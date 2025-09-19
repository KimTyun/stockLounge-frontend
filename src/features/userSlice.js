import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMe, getMyComments, getMyPosts, getMyReward, getUserById, getUsers, updateMe, updateMyProfile } from '../api/userApi'

/**
 * 유저 리스트 가져오기
 * limit : 가져올 개수
 * page : 가져올 페이지
 */
export const getUsersThunk = createAsyncThunk('user/getusers', async ({ limit = 10, page = 1 } = {}, { rejectWithValue }) => {
   try {
      const response = await getUsers(limit, page)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 유저 상세정보 가져오기
 * id : 해당 유저 id
 */
export const getUserByIdThunk = createAsyncThunk('user/getuserById', async (id, { rejectWithValue }) => {
   try {
      const response = await getUserById(id)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 내정보 가져오기
 * id : 해당 유저 id
 */
export const getMeThunk = createAsyncThunk('user/getMe', async (_, { rejectWithValue }) => {
   try {
      const response = await getMe()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 내정보 수정하기
 * data : {name: 닉네임, pw: 비밀번호, age:나이}
 */
export const updateMeThunk = createAsyncThunk('user/updateMe', async (data, { rejectWithValue }) => {
   try {
      const response = await updateMe(data)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 프로필 사진 수정하기
 * formData : 프로필 사진 파일
 */
export const updateMyProfileThunk = createAsyncThunk('user/updateMyProfile', async (formData, { rejectWithValue }) => {
   try {
      const response = await updateMyProfile(formData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 내 작성글 목록 가져오기
 * limit : 가져올 개수
 * page : 가져올 페이지
 */
export const getMyPostsThunk = createAsyncThunk('user/getMyPosts', async ({ limit = 10, page = 1 } = {}, { rejectWithValue }) => {
   try {
      const response = await getMyPosts(limit, page)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 내 작성 댓글 목록 가져오기
 * limit : 가져올 개수
 * page : 가져올 페이지
 */
export const getMyCommentsThunk = createAsyncThunk('user/getMyComments', async ({ limit = 10, page = 1 } = {}, { rejectWithValue }) => {
   try {
      const response = await getMyComments(limit, page)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

/**
 * 내 포인트 기록 가져오기
 * limit : 가져올 개수
 * page : 가져올 페이지
 */
export const getMyRewardThunk = createAsyncThunk('user/getMyReward', async ({ limit = 10, page = 1 } = {}, { rejectWithValue }) => {
   try {
      const response = await getMyReward(limit, page)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const userSlice = createSlice({
   name: 'user',
   initialState: {
      user: null,
      users: [],
      data: {},
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         //유저 리스트 가져오기
         .addCase(getUsersThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getUsersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.data
         })
         .addCase(getUsersThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 유저 리스트를 가져오지 못했습니다.'
         })
         //유저 정보 가져오기
         .addCase(getUserByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getUserByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data
         })
         .addCase(getUserByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 유저 정보를 가져오지 못했습니다.'
         })
         //내정보 가져오기
         .addCase(getMeThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getMeThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data
         })
         .addCase(getMeThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 유저 정보를 가져오지 못했습니다.'
         })
         //내정보 수정하기
         .addCase(updateMeThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateMeThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateMeThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 유저 정보 업데이트를 실패하였습니다.'
         })
         //내프로필 수정하기
         .addCase(updateMyProfileThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateMyProfileThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateMyProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 유저 프로필 변경에 실패하였습니다.'
         })
         //내 작성글 가져오기
         .addCase(getMyPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getMyPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data.posts = action.payload.data
         })
         .addCase(getMyPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 내 작성글 목록을 가져오지 못했습니다.'
         })
         //내 작성 댓글 가져오기
         .addCase(getMyCommentsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getMyCommentsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data.comments = action.payload.data
         })
         .addCase(getMyCommentsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 내 작성 댓글 목록을 가져오지 못했습니다.'
         })
         //내 포인트 기록 가져오기
         .addCase(getMyRewardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getMyRewardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.data.reward = action.payload.data
         })
         .addCase(getMyRewardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.message || '서버 문제로 내 리워드 기록을 가져오지 못했습니다.'
         })
   },
})

export default userSlice.reducer
