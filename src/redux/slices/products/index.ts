import { basicState, clearReducer, meta, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import { fetchProductList } from './action'

interface ProductsState {
  list: SliceState<ProductList[]>
}

const initialState: ProductsState = {
  list: { ...basicState, meta },
}

export const productsSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchProductList })
  },
  initialState,
  name: 'products',
  reducers: {
    clearProduct: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearProduct } = productsSlice.actions

export default productsSlice.reducer
