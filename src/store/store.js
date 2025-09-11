import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice.js'
import boardSlice from '../features/boardSlice.js'
import coinSlice from '../features/coinSlice.js'

const store = configureStore({
   reducer: {
      news: newsSlice,
      coin: coinSlice,
      board: boardSlice,
   },
})

export default store
