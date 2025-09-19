import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as adminApi from '../api/adminApi'

// 사용자 목록
export const getUsersThunk = createAsyncThunk('admin/getUsers', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getUsers()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

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

// 게시판 목록
export const getBoardThunk = createAsyncThunk('admin/getBoards', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getBoards()
      return response.data ?? response
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
      return response.data ?? response
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

// 금지어 관리
export const getBanWordsThunk = createAsyncThunk('admin/getBanWords', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getBanWords()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금지어 생성
export const addBanWordThunk = createAsyncThunk('admin/addBanWord', async (banWordData, { dispatch, rejectWithValue }) => {
   try {
      const response = await adminApi.addBanWord(banWordData)
      dispatch(getBanWordsThunk())
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 금지어 삭제
export const deleteBanWordThunk = createAsyncThunk('admin/deleteBanWord', async (banWordId, { rejectWithValue }) => {
   try {
      await adminApi.deleteBanWord(banWordId)
      return banWordId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 목록
export const getProductsThunk = createAsyncThunk('admin/getProducts', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getProducts()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 생성
export const addProductThunk = createAsyncThunk('admin/addProduct', async (productData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addProduct(productData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 수정
export const updateProductThunk = createAsyncThunk('admin/updateProduct', async ({ productId, productData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateProduct(productId, productData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 삭제
export const deleteProductThunk = createAsyncThunk('admin/deleteProduct', async (productId, { rejectWithValue }) => {
   try {
      await adminApi.deleteProduct(productId)
      return productId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

//상품 유형 관리
export const getProductListsThunk = createAsyncThunk('admin/getProductLists', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getProductLists()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 유형 생성 Thunk
export const addProductListThunk = createAsyncThunk('admin/addProductList', async (listData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addProductList(listData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 유형 수정 Thunk
export const updateProductListThunk = createAsyncThunk('admin/updateProductList', async ({ listId, listData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateProductList(listId, listData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 유형 삭제 Thunk
export const deleteProductListThunk = createAsyncThunk('admin/deleteProductList', async (listId, { rejectWithValue }) => {
   try {
      await adminApi.deleteProductList(listId)
      return listId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// // 여기부터 통계

// 전체 통계 데이터 가져오기
export const getStatisticsThunk = createAsyncThunk('admin/getStatistics', async (period = 'week', { rejectWithValue }) => {
   try {
      const response = await adminApi.getStatistics(period)
      console.log('Thunk received response:', response)

      // response가 직접 데이터인지, 아니면 response.data 구조인지 확인
      const data = response.data || response

      return {
         period,
         data: data,
      }
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 인기 게시글 가져오기 (별도 API가 필요한 경우)
export const getPopularPostsThunk = createAsyncThunk('admin/getPopularPosts', async (period = 'week', { rejectWithValue }) => {
   try {
      const response = await adminApi.getPopularPosts(period)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 활성 사용자 가져오기 (별도 API가 필요한 경우)
export const getActiveUsersThunk = createAsyncThunk('admin/getActiveUsers', async (period = 'week', { rejectWithValue }) => {
   try {
      const response = await adminApi.getActiveUsers(period)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 카테고리별 통계 가져오기 (별도 API가 필요한 경우)
export const getCategoryStatsThunk = createAsyncThunk('admin/getCategoryStats', async (period = 'week', { rejectWithValue }) => {
   try {
      const response = await adminApi.getCategoryStats(period)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 시간대별 통계 가져오기 (별도 API가 필요한 경우)
export const getHourlyStatsThunk = createAsyncThunk('admin/getHourlyStats', async (period = 'week', { rejectWithValue }) => {
   try {
      const response = await adminApi.getHourlyStats(period)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

const adminSlice = createSlice({
   name: 'admin',
   initialState: {
      users: [],
      boards: [],
      settings: {},
      banWords: [],
      banWordsLoading: false,
      banWordsError: null,
      products: [],
      productLists: [],
      loading: {
         users: false,
         boards: false,
         settings: false,
         banWords: false,
         products: false,
         productLists: false,
      },
      error: {
         settings: null,
         products: null,
         banWords: null,
         productLists: null,
      },
      // 통계 관련 상태들
      statistics: null,
      popularPosts: [],
      activeUsers: [],
      categoryStats: [],
      hourlyStats: [],

      // 개별 로딩 상태들
      statisticsLoading: false,
      popularPostsLoading: false,
      activeUsersLoading: false,
      categoryStatsLoading: false,
      hourlyStatsLoading: false,
   },
   reducers: {
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 사용자 목록
         .addCase(getUsersThunk.pending, (state) => {
            state.loading.users = true
            state.error = null
         })
         .addCase(getUsersThunk.fulfilled, (state, action) => {
            state.loading.users = false
            state.users = action.payload
         })
         .addCase(getUsersThunk.rejected, (state, action) => {
            state.loading.users = false
            state.error = action.payload?.message || '사용자 목록을 불러오지 못했습니다.'
         })
         // 사용자 제재
         .addCase(updateUserStatusThunk.pending, (state) => {
            state.loading.users = true
            state.error = null
         })
         .addCase(updateUserStatusThunk.fulfilled, (state, action) => {
            state.loading.users = false
            const { userId, isBanned } = action.payload
            const userIndex = state.users.findIndex((user) => user.id === userId)
            if (userIndex !== -1) {
               state.users[userIndex].is_ban = isBanned
            }
         })
         .addCase(updateUserStatusThunk.rejected, (state, action) => {
            state.loading.users = false
            state.error = action.payload?.message || '사용자 제재 처리에 실패했습니다.'
         })

         // 사용자 제재
         .addCase(deleteUserThunk.pending, (state) => {
            state.loading.users = true
            state.error = null
         })
         .addCase(deleteUserThunk.fulfilled, (state, action) => {
            const deletedUserId = action.meta.arg
            state.users = state.users.filter((user) => user.id !== deletedUserId)
            state.loading.users = false
         })
         .addCase(deleteUserThunk.rejected, (state, action) => {
            state.loading.users = false
            state.error = action.payload?.message || '사용자 삭제에 실패했습니다.'
         })

         // 게시판 목록
         .addCase(getBoardThunk.pending, (state) => {
            state.loading.boards = true
            state.error = null
         })
         .addCase(getBoardThunk.fulfilled, (state, action) => {
            state.loading.boards = false
            state.boards = action.payload || []
         })
         .addCase(getBoardThunk.rejected, (state, action) => {
            state.loading.boards = false
            state.error = action.payload?.message || '게시판 목록을 불러오지 못했습니다.'
         })

         // 게시판 삭제
         .addCase(deleteBoardThunk.pending, (state) => {
            state.loading.boards = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state, action) => {
            state.loading.boards = false
            state.boards = state.boards.filter((board) => board.id !== action.payload)
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loading.boards = false
            state.error = action.payload?.message || '게시판을 삭제하지 못했습니다.'
         })

         // 사이트 설정
         .addCase(getSiteSettingsThunk.pending, (state) => {
            state.loading.settings = true
         })
         .addCase(getSiteSettingsThunk.fulfilled, (state, action) => {
            state.loading.settings = false
            state.settings = action.payload
         })
         .addCase(getSiteSettingsThunk.rejected, (state, action) => {
            state.loading.settings = false
            state.error = action.payload?.message || '사이트 설정을 불러오지 못했습니다.'
         })

         // 사이트 설정 수정
         .addCase(updateSiteSettingsThunk.pending, (state) => {
            state.loading.settings = true
            state.error = null
         })
         .addCase(updateSiteSettingsThunk.fulfilled, (state, action) => {
            state.loading.settings = false
            state.settings = { ...state.settings, ...action.payload }
         })
         .addCase(updateSiteSettingsThunk.rejected, (state, action) => {
            state.loading.settings = false
            state.error = action.payload?.message || '사이트 설정을 수정하지 못했습니다.'
         })

         // 금지어 조회
         .addCase(getBanWordsThunk.pending, (state) => {
            state.banWordsLoading = true
            state.banWordsError = null
         })
         .addCase(getBanWordsThunk.fulfilled, (state, action) => {
            state.banWordsLoading = false
            state.banWords = Array.isArray(action.payload) ? action.payload : action.payload?.data || []
         })
         .addCase(getBanWordsThunk.rejected, (state, action) => {
            state.banWordsLoading = false
            state.banWordsError = action.payload?.message || '금지어를 불러오지 못했습니다.'
         })

         // 금지어 생성
         .addCase(addBanWordThunk.pending, (state) => {
            state.banWordsLoading = true
            state.banWordsError = null
         })
         .addCase(addBanWordThunk.fulfilled, (state) => {
            state.banWordsLoading = false
         })
         .addCase(addBanWordThunk.rejected, (state, action) => {
            state.banWordsLoading = false
            state.banWordsError = action.payload?.message || '금지어를 추가하지 못했습니다.'
         })

         // 금지어 삭제
         .addCase(deleteBanWordThunk.pending, (state) => {
            state.banWordsLoading = true
            state.banWordsError = null
         })
         .addCase(deleteBanWordThunk.fulfilled, (state, action) => {
            state.banWordsLoading = false
            state.banWords = state.banWords.filter((word) => word.id !== action.payload)
         })
         .addCase(deleteBanWordThunk.rejected, (state, action) => {
            state.banWordsLoading = false
            state.banWordsError = action.payload?.message || '금지어를 삭제하지 못했습니다.'
         })

         // 상품 목록
         .addCase(getProductsThunk.pending, (state) => {
            state.loading.products = true
            state.error = null
         })
         .addCase(getProductsThunk.fulfilled, (state, action) => {
            state.loading.products = false
            const payloadData = action.payload?.data || action.payload
            if (Array.isArray(payloadData)) {
               state.products = payloadData.map((product) => ({
                  ...product,
                  points: product.price,
               }))
            } else {
               state.products = []
            }
         })
         .addCase(getProductsThunk.rejected, (state, action) => {
            state.loading.products = false
            state.error = action.payload?.message || '상품 목록을 불러오지 못했습니다.'
         })

         // 상품 추가
         .addCase(addProductThunk.pending, (state) => {
            state.loading.products = true
            state.error = null
         })
         .addCase(addProductThunk.fulfilled, (state, action) => {
            state.loading.products = false
            const newProduct = {
               ...action.payload.product,
               points: action.payload.product.price,
            }
            state.products = [...state.products, newProduct]
         })
         .addCase(addProductThunk.rejected, (state, action) => {
            state.loading.products = false
            state.error = action.payload?.message || '상품을 추가하지 못했습니다.'
         })

         // 상품 수정
         .addCase(updateProductThunk.pending, (state) => {
            state.loading.products = true
            state.error = null
         })
         .addCase(updateProductThunk.fulfilled, (state, action) => {
            state.loading.products = false
            const updatedProduct = action.payload.product
            const productIndex = state.products.findIndex((product) => product.id === updatedProduct.id)
            if (productIndex !== -1) {
               state.products[productIndex] = updatedProduct
            }
         })
         .addCase(updateProductThunk.rejected, (state, action) => {
            state.loading.products = false
            state.error = action.payload?.message || '상품을 수정하지 못했습니다.'
         })

         // 상품 삭제
         .addCase(deleteProductThunk.pending, (state) => {
            state.loading.products = true
            state.error = null
         })
         .addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.loading.products = false
            const deletedId = action.payload?.deletedId || action.payload
            state.products = state.products.filter((product) => product.id !== deletedId)
         })
         .addCase(deleteProductThunk.rejected, (state, action) => {
            state.loading.products = false
            state.error = action.payload?.message || '상품을 삭제하지 못했습니다.'
         })
         //상품 유형 관리
         .addCase(getProductListsThunk.pending, (state) => {
            state.loading.productLists = true
         })
         .addCase(getProductListsThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            state.productLists = action.payload
         })
         .addCase(getProductListsThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error.productLists = action.payload?.message || '상품 유형을 불러오지 못했습니다.'
         })

         // 상품 유형 생성
         .addCase(addProductListThunk.pending, (state) => {
            state.loading.productLists = true
            state.error.productLists = null
         })
         .addCase(addProductListThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            state.productLists.push(action.payload)
         })
         .addCase(addProductListThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error.productLists = action.payload?.message || '상품 유형을 추가하지 못했습니다.'
         })

         // 상품 유형 수정
         .addCase(updateProductListThunk.pending, (state) => {
            state.loading.productLists = true
            state.error.productLists = null
         })
         .addCase(updateProductListThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            const index = state.productLists.findIndex((list) => list.id === action.payload.id)
            if (index !== -1) {
               state.productLists[index] = action.payload
            }
         })
         .addCase(updateProductListThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error.productLists = action.payload?.message || '상품 유형을 수정하지 못했습니다.'
         })

         // 상품 유형 삭제
         .addCase(deleteProductListThunk.pending, (state) => {
            state.loading.productLists = true
            state.error.productLists = null
         })
         .addCase(deleteProductListThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            state.productLists = state.productLists.filter((list) => list.id !== action.payload)
         })
         .addCase(deleteProductListThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error.productLists = action.payload?.message || '상품 유형을 삭제하지 못했습니다.'
         })

         // 전체 통계 데이터
         .addCase(getStatisticsThunk.pending, (state) => {
            state.loading.statistics = true
            state.statisticsLoading = true
            state.error = null
         })
         .addCase(getStatisticsThunk.fulfilled, (state, action) => {
            console.log('Redux action.payload:', action.payload)

            const payload = action.payload || {}
            const { period, data } = payload

            // data가 없다면 에러 처리
            if (!data) {
               console.error('No data in payload:', action.payload)
               state.loading.statistics = false
               state.statisticsLoading = false
               state.error = 'No data received from server'
               return
            }

            // 백엔드 응답 구조 확인 및 안전하게 처리
            console.log('Processing data:', data)

            // 백엔드 응답 구조에 맞게 데이터 변환
            const { mainStats = {}, popularPosts = [], activeUsers = [], categoryStats = [], hourlyActivity = [] } = data

            // 백엔드에서 계산된 변화율과 함께 통계 데이터 설정
            state.statistics = {
               visitors: mainStats.visitors || { current: 0, previous: 0, change: 0 },
               pageViews: mainStats.pageViews || { current: 0, previous: 0, change: 0 },
               newUsers: mainStats.newUsers || { current: 0, previous: 0, change: 0 },
               posts: mainStats.posts || { current: 0, previous: 0, change: 0 },
               comments: mainStats.comments || { current: 0, previous: 0, change: 0 },
               reports: mainStats.reports || { current: 0, previous: 0, change: 0 },
            }

            // 인기 게시글 데이터 설정
            state.popularPosts = Array.isArray(popularPosts)
               ? popularPosts.map((post) => ({
                    id: post.id,
                    title: post.title || '',
                    view_count: post.view_count || 0,
                    like_count: post.like_count || 0,
                    comment_count: post.comment_count || 0,
                 }))
               : []

            // 활성 사용자 데이터 설정
            state.activeUsers = Array.isArray(activeUsers)
               ? activeUsers.map((user) => ({
                    id: user.id,
                    name: user.name || '익명',
                    post_count: user.post_count || 0,
                    comment_count: user.comment_count || 0,
                    points: user.points || 0,
                    accumulated_points: user.accumulated_points || 0,
                 }))
               : []

            // 카테고리별 통계 변환
            if (Array.isArray(categoryStats) && categoryStats.length > 0) {
               const totalCategoryPosts = categoryStats.reduce((sum, cat) => sum + (cat.count || 0), 0)
               const categoryColors = ['bg-warning', 'bg-info', 'bg-secondary', 'bg-primary', 'bg-success']

               state.categoryStats = categoryStats.map((category, index) => ({
                  id: index,
                  name: category.name || '기타',
                  count: category.count || 0,
                  percentage: totalCategoryPosts > 0 ? Math.round((category.count / totalCategoryPosts) * 100) : 0,
                  colorClass: categoryColors[index % categoryColors.length],
               }))
            } else {
               state.categoryStats = []
            }

            // 시간대별 통계 변환
            if (Array.isArray(hourlyActivity) && hourlyActivity.length > 0) {
               const timeRanges = [
                  { range: '00:00 - 06:00', hours: [0, 1, 2, 3, 4, 5] },
                  { range: '06:00 - 12:00', hours: [6, 7, 8, 9, 10, 11] },
                  { range: '12:00 - 18:00', hours: [12, 13, 14, 15, 16, 17] },
                  { range: '18:00 - 24:00', hours: [18, 19, 20, 21, 22, 23] },
               ]

               const totalHourlyPosts = hourlyActivity.reduce((sum, hour) => sum + (hour.count || 0), 0)
               const timeSlotColors = ['bg-secondary', 'bg-info', 'bg-success', 'bg-primary']

               state.hourlyStats = timeRanges.map((timeSlot, index) => {
                  const slotCount = hourlyActivity.filter((hour) => timeSlot.hours.includes(hour.hour)).reduce((sum, hour) => sum + (hour.count || 0), 0)

                  return {
                     timeRange: timeSlot.range,
                     count: slotCount,
                     percentage: totalHourlyPosts > 0 ? Math.round((slotCount / totalHourlyPosts) * 100) : 0,
                     colorClass: timeSlotColors[index],
                  }
               })
            } else {
               state.hourlyStats = []
            }

            state.loading.statistics = false
            state.statisticsLoading = false
         })
         .addCase(getStatisticsThunk.rejected, (state, action) => {
            state.loading.statistics = false
            state.statisticsLoading = false
            state.error = action.payload
         })

         // 개별 API들 (필요한 경우)
         .addCase(getPopularPostsThunk.pending, (state) => {
            state.popularPostsLoading = true
         })
         .addCase(getPopularPostsThunk.fulfilled, (state, action) => {
            state.popularPosts = action.payload
            state.popularPostsLoading = false
         })
         .addCase(getPopularPostsThunk.rejected, (state, action) => {
            state.popularPostsLoading = false
            state.error = action.payload
         })

         .addCase(getActiveUsersThunk.pending, (state) => {
            state.activeUsersLoading = true
         })
         .addCase(getActiveUsersThunk.fulfilled, (state, action) => {
            state.activeUsers = action.payload
            state.activeUsersLoading = false
         })
         .addCase(getActiveUsersThunk.rejected, (state, action) => {
            state.activeUsersLoading = false
            state.error = action.payload
         })

         .addCase(getCategoryStatsThunk.pending, (state) => {
            state.categoryStatsLoading = true
         })
         .addCase(getCategoryStatsThunk.fulfilled, (state, action) => {
            state.categoryStats = action.payload
            state.categoryStatsLoading = false
         })
         .addCase(getCategoryStatsThunk.rejected, (state, action) => {
            state.categoryStatsLoading = false
            state.error = action.payload
         })

         .addCase(getHourlyStatsThunk.pending, (state) => {
            state.hourlyStatsLoading = true
         })
         .addCase(getHourlyStatsThunk.fulfilled, (state, action) => {
            state.hourlyStats = action.payload
            state.hourlyStatsLoading = false
         })
         .addCase(getHourlyStatsThunk.rejected, (state, action) => {
            state.hourlyStatsLoading = false
            state.error = action.payload
         })
   },
})

export default adminSlice.reducer
