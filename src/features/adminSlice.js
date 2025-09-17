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

// 교환품 목록
export const getProductsThunk = createAsyncThunk('admin/getProducts', async (_, { rejectWithValue }) => {
   try {
      const response = await adminApi.getProducts()
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 생성
export const addProductThunk = createAsyncThunk('admin/addProduct', async (productData, { rejectWithValue }) => {
   try {
      const response = await adminApi.addProduct(productData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 수정
export const updateProductThunk = createAsyncThunk('admin/updateProduct', async ({ productId, productData }, { rejectWithValue }) => {
   try {
      const response = await adminApi.updateProduct(productId, productData)
      return response
   } catch (error) {
      return rejectWithValue(error.response?.data)
   }
})

// 교환품 삭제
export const deleteProductThunk = createAsyncThunk('admin/deleteProduct', async (productId, { rejectWithValue }) => {
   try {
      await adminApi.deleteProduct(productId)
      return productId
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
      loading: {
         users: false,
         boards: false,
         settings: false,
         banWords: false,
         products: false,
      },
      error: null,
   },
   reducers: {
      clearError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
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
            state.error = action.payload?.message || '사용자를 제재하지 못했습니다.'
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
            state.settings = action.payload
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
            state.banWords = action.payload
         })
         .addCase(getBanWordsThunk.rejected, (state, action) => {
            state.banWordsLoading = false
            state.banWordsError = action.payload
         })

         // 금지어 생성
         .addCase(addBanWordThunk.pending, (state) => {
            state.banWordsLoading = true
            state.banWordsError = null
         })
         .addCase(addBanWordThunk.fulfilled, (state, action) => {
            state.banWordsLoading = false
         })
         .addCase(addBanWordThunk.rejected, (state, action) => {
            state.banWordsLoading = false
            state.banWordsError = action.payload
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
            state.banWordsError = action.payload
         })

         // 교환품 목록
         .addCase(getProductsThunk.pending, (state) => {
            state.loading.products = true
            state.error = null
         })
         .addCase(getProductsThunk.fulfilled, (state, action) => {
            state.loading.products = false
            if (action.payload && action.payload.data) {
               state.products = action.payload.data.map((product) => ({
                  ...product,
                  points: product.price,
               }))
            } else {
               state.products = []
            }
         })
         .addCase(getProductsThunk.rejected, (state, action) => {
            state.loading.products = false
            state.error = action.payload?.message || '교환품 목록을 불러오지 못했습니다.'
         })

         // 교환품 추가
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
            state.products.push(newProduct)
         })
         .addCase(addProductThunk.rejected, (state, action) => {
            state.loading.products = false
            state.error = action.payload?.message || '교환품을 추가하지 못했습니다.'
         })

         // 교환품 수정
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
            state.error = action.payload?.message || '교환품을 수정하지 못했습니다.'
         })

         // 교환품 삭제
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
            state.error = action.payload?.message || '교환품을 삭제하지 못했습니다.'
         })
   },
})

export default adminSlice.reducer
