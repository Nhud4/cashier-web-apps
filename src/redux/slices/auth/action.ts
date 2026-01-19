import * as services from '@api/users/users.api'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const authLogin = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await services.login(payload)
      return response
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)
