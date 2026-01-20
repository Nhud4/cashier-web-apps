import { configureStore } from '@reduxjs/toolkit'

import app from './slices/appSlice'
import auth from './slices/auth'
import category from './slices/category'
import order from './slices/order'
import products from './slices/products'
import transaction from './slices/transaction'

export const store = configureStore({
  reducer: {
    app,
    auth,
    category,
    order,
    products,
    transaction,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
