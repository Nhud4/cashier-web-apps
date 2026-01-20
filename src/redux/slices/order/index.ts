import { basicState, clearReducer, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import { fetchOrderCreate, fetchOrderDetail } from './action'

interface OrderState {
  detail: SliceState<OrderData | null>
  add: SliceState<unknown>
}

const initialState: OrderState = {
  add: basicState,
  detail: { ...basicState, data: null },
}

export const orderSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'add', thunk: fetchOrderCreate })
    thunkBuilder({ builder, key: 'detail', thunk: fetchOrderDetail })
  },
  initialState,
  name: 'order',
  reducers: {
    clearOrder: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearOrder } = orderSlice.actions

export default orderSlice.reducer
