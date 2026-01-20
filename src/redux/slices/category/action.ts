import * as services from '@api/category/category.api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchListCategory = createAsyncThunk(
  'category/list',
  async (params: TableParams, { rejectWithValue }) => {
    try {
      const response = await services.ListCategory(params)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
