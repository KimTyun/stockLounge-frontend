import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice.js'

const store = configureStore({
   reducer: {
      news: newsSlice,
   },
})

export default store
