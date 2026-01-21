import { basicState, clearReducer, meta, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import {
  fetchTransactionCreate,
  fetchTransactionDetail,
  fetchTransactionList,
  fetchTransactionUpdate,
} from './action'

interface TransactionState {
  list: SliceState<TransactionList[]>
  detail: SliceState<TransactionDetail | null>
  add: SliceState<unknown>
  edit: SliceState<unknown>
}

const initialState: TransactionState = {
  add: basicState,
  detail: { ...basicState, data: null },
  edit: basicState,
  list: { ...basicState, meta },
}

export const transactionSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'list', thunk: fetchTransactionList })
    thunkBuilder({ builder, key: 'detail', thunk: fetchTransactionDetail })
    thunkBuilder({ builder, key: 'add', thunk: fetchTransactionCreate })
    thunkBuilder({ builder, key: 'edit', thunk: fetchTransactionUpdate })
  },
  initialState,
  name: 'transaction',
  reducers: {
    clearTransaction: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearTransaction } = transactionSlice.actions

export default transactionSlice.reducer
