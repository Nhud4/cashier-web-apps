import { basicState, clearReducer, meta, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import { fetchListCategory } from './action'

interface CategoryState {
  list: SliceState<ProductsCategory[]>
}

const initialState: CategoryState = {
  list: { ...basicState, meta },
}

export const categorySlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchListCategory })
  },
  initialState,
  name: 'category',
  reducers: {
    clearCategory: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearCategory } = categorySlice.actions

export default categorySlice.reducer
