import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice.js'
import coinSlice from '../features/coinSlice.js'

const store = configureStore({
   reducer: {
      news: newsSlice,
      coin: coinSlice,
   },
})

export default store
