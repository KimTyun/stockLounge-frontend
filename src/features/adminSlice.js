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

// 상품 유형 관리
export const getProductListsThunk = createAsyncThunk('admin/getProductLists', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getProductLists()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 유형 생성
export const addProductListThunk = createAsyncThunk('admin/addProductList', async (listData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addProductList(listData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 유형 수정
export const updateProductListThunk = createAsyncThunk('admin/updateProductList', async ({ listId, listData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateProductList(listId, listData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 상품 유형 삭제
export const deleteProductListThunk = createAsyncThunk('admin/deleteProductList', async (listId, { rejectWithValue }) => {
   try {
      await adminApi.deleteProductList(listId)
      return listId
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// // 여기부터 통계

// 통계
export const getStatisticsThunk = createAsyncThunk('admin/getStatistics', async (period, { rejectWithValue }) => {
   try {
      const data = await adminApi.getStatistics(period)
      return data
   } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
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
         allStats: false,
      },
      error: {
         settings: null,
         products: null,
         banWords: null,
         productLists: null,
         allStats: null,
      },
      // 통계 관련 상태들
      statistics: null,
      popularPosts: [],
      activeUsers: [],
      categoryStats: [],
      hourlyStats: [],
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

         // 포인트 시스템
         .addCase(updateUserRewardThunk.pending, (state) => {
            state.loading.rewards = true
            state.error.rewards = null
         })
         .addCase(updateUserRewardThunk.fulfilled, (state, action) => {
            state.loading.rewards = false
            const userIndex = state.users.findIndex((user) => user.id === action.payload.userId)
            if (userIndex !== -1) {
               state.users[userIndex].Reward = { point: action.payload.newPoints }
            }
         })
         .addCase(updateUserRewardThunk.rejected, (state, action) => {
            state.loading.rewards = false
            state.error.rewards = action.payload?.message || '포인트 업데이트에 실패했습니다.'
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

         // 상품 유형 관리
         .addCase(getProductListsThunk.pending, (state) => {
            state.loading.productLists = true
            state.error = state.error || {}
            state.error.productLists = null
         })
         .addCase(getProductListsThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            state.productLists = action.payload || []
         })
         .addCase(getProductListsThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.productLists = []
            state.error = state.error || {}
            state.error.productLists = action.payload?.message || '상품 유형을 불러오지 못했습니다.'
         })

         // 상품 유형 생성
         .addCase(addProductListThunk.pending, (state) => {
            state.loading.productLists = true
            state.error = state.error || {}
            state.error.productLists = null
         })
         .addCase(addProductListThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            state.productLists.push(action.payload)
         })
         .addCase(addProductListThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error = state.error || {}
            state.error.productLists = action.payload?.message || '상품 유형을 추가하지 못했습니다.'
         })

         // 상품 유형 수정
         .addCase(updateProductListThunk.pending, (state) => {
            state.loading.productLists = true
            state.error = state.error || {}
            state.error.productLists = null
         })
         .addCase(updateProductListThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            const updatedItem = action.payload
            const index = state.productLists.findIndex((list) => list.id === updatedItem.id)
            if (index !== -1) {
               state.productLists[index] = updatedItem
            }
         })
         .addCase(updateProductListThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error = state.error || {}
            state.error.productLists = action.payload?.message || '상품 유형을 수정하지 못했습니다.'
         })

         // 상품 유형 삭제
         .addCase(deleteProductListThunk.pending, (state) => {
            state.loading.productLists = true
            state.error = state.error || {}
            state.error.productLists = null
         })
         .addCase(deleteProductListThunk.fulfilled, (state, action) => {
            state.loading.productLists = false
            state.productLists = state.productLists.filter((list) => list.id !== action.payload)
         })
         .addCase(deleteProductListThunk.rejected, (state, action) => {
            state.loading.productLists = false
            state.error = state.error || {}
            state.error.productLists = action.payload?.message || '상품 유형을 삭제하지 못했습니다.'
         })

         // 통계
         .addCase(getStatisticsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getStatisticsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.statistics = action.payload
         })
         .addCase(getStatisticsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default adminSlice.reducer
