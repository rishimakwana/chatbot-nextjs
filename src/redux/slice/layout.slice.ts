import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isWebsiteLoading: true,
    fullPageLoader: false,
    sidebarDrawer: false,
  },
  reducers: {
    setWebsiteLoader: (state, action: PayloadAction<boolean>) => {
      state.isWebsiteLoading = action.payload
    },

    setFullPageLoader: (state, action: PayloadAction<boolean>) => {
      state.fullPageLoader = action.payload
    },

    setSidebarDrawer: (state, action: PayloadAction<boolean>) => {
      state.sidebarDrawer = action.payload
    },
  },
})

export const { setWebsiteLoader, setFullPageLoader, setSidebarDrawer } = layoutSlice.actions
