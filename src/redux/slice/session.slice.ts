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
    updateSessionTitle: (state, action: PayloadAction<{ session_id: number | string; title: string }>) => {
      const sessionToUpdate = state.sessions.find(session => session._id === action.payload.session_id)
      if (sessionToUpdate) {
        sessionToUpdate.title = action.payload.title
      }
    },
  },
})

export const { addSessions, updateSessionTitle } = sessionSlice.actions
export default sessionSlice.reducer
