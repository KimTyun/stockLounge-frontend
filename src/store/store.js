import { configureStore } from '@reduxjs/toolkit'
import newsSlice from '../features/newsSlice.js'
import boardSlice from '../features/boardSlice.js'

const store = configureStore({
   reducer: {
      news: newsSlice,
      board: boardSlice,
   },
})

export default store
