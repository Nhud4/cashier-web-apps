import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  openSideMenu: boolean
}

const initialState: AppState = {
  openSideMenu: true,
}

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    toggleSideMenu: (state) => {
      state.openSideMenu = !state.openSideMenu
    },
  },
})

export const { toggleSideMenu } = appSlice.actions

export default appSlice.reducer
