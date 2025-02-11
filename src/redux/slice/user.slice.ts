import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDTO } from '@/dto'
import { TRoles } from '@/types'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    role: '' as TRoles,
    userData: {} as UserDTO,
  },
  reducers: {
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state.userData = action.payload
      state.isLoggedIn = true
      state.role = action.payload.userRoles.role.name
    },
  },
})

export const { updateUser } = userSlice.actions
