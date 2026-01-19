import { basicState, clearReducer, thunkBuilder } from '@redux/utils'
import { createSlice } from '@reduxjs/toolkit'

import { authLogin } from './action'

interface AuthState {
  add: SliceState<LoginResponse | null>
}

const initialState: AuthState = {
  add: { ...basicState, data: null },
}

export const authSlice = createSlice({
  extraReducers: (builder) => {
    thunkBuilder({ builder, key: 'add', thunk: authLogin })
  },
  initialState,
  name: 'auth',
  reducers: {
    clearAuth: (state, action) => {
      clearReducer(state, action)
    },
  },
})

export const { clearAuth } = authSlice.actions

export default authSlice.reducer
