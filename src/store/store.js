import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice.js'
import boardSlice from '../features/boardSlice.js'
import coinSlice from '../features/coinSlice.js'
import adminSlice from '../features/adminSlice.js'

const store = configureStore({
   reducer: {
      news: newsSlice,
      coin: coinSlice,
      board: boardSlice,
      admin: adminSlice,
   },
})

export default store
