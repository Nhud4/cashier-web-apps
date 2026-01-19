import { configureStore } from '@reduxjs/toolkit'

import app from './slices/appSlice'
import auth from './slices/auth'

export const store = configureStore({
  reducer: {
    app,
    auth,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
