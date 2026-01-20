import * as services from '@api/transactions/transaction.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { generateNoColumn } from '@utils/index'

export const fetchTransactionList = createAsyncThunk(
  'transaction/list',
  async (params: TableParams, { rejectWithValue }) => {
    try {
      const { data, meta, ...res } = await services.getTransaction(params)

      return {
        ...res,
        data: data.map((item, index) => ({
          ...item,
          no: generateNoColumn(meta, index, Number(params.size)),
        })),
        meta,
      }
      return
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchTransactionDetail = createAsyncThunk(
  'transaction/detail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await services.detailTransaction(code)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchTransactionCreate = createAsyncThunk(
  'transaction/create',
  async (payload: TransactionCreate, { rejectWithValue }) => {
    try {
      const response = await services.createTransaction(payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
