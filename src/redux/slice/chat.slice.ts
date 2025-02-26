import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  type: 'question' | 'answer'
  content: string
  files?: string[]
  isNewChat?: boolean
}

interface ChatSession {
  isLoading: boolean
  chats: Message[]
}

type ChatState = Record<string, ChatSession>

const initialState: ChatState = {}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ sessionId: string; messages: Message[] }>) => {
      const { sessionId, messages } = action.payload
      if (!state[sessionId]) {
        state[sessionId] = { isLoading: false, chats: [] }
      }
      state[sessionId].chats.push(...messages)
    },
    setLoading: (state, action: PayloadAction<{ sessionId: string; isLoading: boolean }>) => {
      const { sessionId, isLoading } = action.payload
      if (!state[sessionId]) {
        state[sessionId] = { isLoading: false, chats: [] }
      }
      state[sessionId].isLoading = isLoading
    },
    setNewChat: (state, action: PayloadAction<{ sessionId: string; isNewChat: boolean }>) => {
      const { sessionId, isNewChat } = action.payload
      if (state[sessionId] && state[sessionId].chats.length > 0) {
        state[sessionId].chats[0].isNewChat = isNewChat
      }
    },
  },
})

export const { addMessage, setLoading, setNewChat } = chatSlice.actions
export default chatSlice.reducer
