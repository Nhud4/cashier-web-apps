import * as services from '@api/transactions/transaction.api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchOrderDetail = createAsyncThunk(
  'order/detail',
  async (_, { rejectWithValue }) => {
    try {
      const response = await services.getOrder()
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const fetchOrderCreate = createAsyncThunk(
  'order/create',
  async (payload: CreateOrderRequest, { rejectWithValue }) => {
    try {
      const response = await services.createOrder(payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
