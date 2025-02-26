import { TGetSessionListResponse } from '@/types/session'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessions: [] as TGetSessionListResponse[],
  },
  reducers: {
    addSessions: (state, action: PayloadAction<TGetSessionListResponse[]>) => {
      state.sessions = action.payload
    },
  },
})

export const { addSessions } = sessionSlice.actions
export default sessionSlice.reducer
