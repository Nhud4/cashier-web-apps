import * as services from '@api/items/items.api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProductList = createAsyncThunk(
  'products/list',
  async (params: ProductListParams, { rejectWithValue }) => {
    try {
      const response = await services.ListProduct(params)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
