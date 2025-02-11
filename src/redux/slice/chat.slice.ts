import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  type: 'user' | 'bot'
  content: string
  files?: string
  temp_link?: string | undefined
}

interface ChatState {
  messages: Message[];
}

export const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setMessages, clearMessages } = chatSlice.actions;