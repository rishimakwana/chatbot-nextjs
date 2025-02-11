import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '../api/api.config'
import { rtkQueryLogger } from '../api/api.util'
import { layoutSlice } from '../slice/layout.slice'
import { userSlice } from '../slice/user.slice'
import { chatSlice } from '../slice/chat.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryLogger),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
