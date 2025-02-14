// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Message {
//   type: 'user' | 'bot';
//   content: string;
//   files?: string;
//   temp_link?: string | undefined;
// }

// interface ChatState {
//   sessions: {
//     [sessionId: string]: Message[];
//   };
// }

// export const initialState: ChatState = {
//   sessions: {},
// };

// export const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     addMessage: (
//       state,
//       action: PayloadAction<{ sessionId: string; message: Message }>
//     ) => {
//       const { sessionId, message } = action.payload;
//       if (!state.sessions[sessionId]) {
//         state.sessions[sessionId] = [];
//       }
//       state.sessions[sessionId].push(message);
//     },
//     setMessages: (
//       state,
//       action: PayloadAction<{ sessionId: string; messages: Message[] }>
//     ) => {
//       const { sessionId, messages } = action.payload;
//       state.sessions[sessionId] = messages;
//     },
//     // clearMessages: (state, action: PayloadAction<{ sessionId: string }>) => {
//     //   const { sessionId } = action.payload;
//     //   state.sessions[sessionId] = [];
//     // },
//     clearMessages: (state) => {
//       state.sessions = {};
//     },
//   },
// });

// export const { addMessage, setMessages, clearMessages } = chatSlice.actions;
// export default chatSlice.reducer;



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
