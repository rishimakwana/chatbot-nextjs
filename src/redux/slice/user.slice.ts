import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDTO } from '@/dto'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userData: {} as UserDTO,
  },
  reducers: {
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state.userData = action.payload
      state.isLoggedIn = true
    },
  },
})

export const { updateUser } = userSlice.actions
