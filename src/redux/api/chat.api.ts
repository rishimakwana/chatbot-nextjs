import { sendMessageResponse } from '@/dto';
import { setNewChat } from '../slice/chat.slice';
import { api } from './api.config'

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessions: builder.query<any, { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 10 } = {}) =>
        `/api/get-all-sessions?skip=${skip}&limit=${limit}`,
      providesTags: (result) =>
        result && result.data
          ? [
            ...result.data.map(({ _id }: { _id: string }) => ({ type: 'Sessions', id: _id })),
            { type: 'Sessions', id: 'LIST' },
          ]
          : [{ type: 'Sessions', id: 'LIST' }],
    }),

    getSession: builder.query<any, void>({
      query: () => ({
        url: '/api/get-session',
        method: 'GET',
        headers: { hideSuccessToast: 'false' },
      }),
    }),

    addSession: builder.mutation<any, void>({
      query: (body) => ({
        url: '/api/add-session',
        method: 'POST',
        body,
        headers: { hideSuccessToast: 'false' },
      }),
    }),

    getChatHistory: builder.query<any, string>({
      query: (sessionId) => `/api/get-chat-history/${sessionId}`,
    }),

    sendMessage: builder.mutation<sendMessageResponse, { session_id: string; query: string; isNewChat: boolean }>({
      query: ({ session_id, query }) => ({
        url: `/api/sendMessage?query=${encodeURIComponent(query)}&session_id=${session_id}`,
        method: 'POST',
        // body: { session_id, query },
        headers: { hideSuccessToast: 'false' },
      }),
      async onQueryStarted({ session_id, isNewChat }, { dispatch, queryFulfilled }) {
        if (isNewChat) dispatch(setNewChat({ sessionId: session_id, isNewChat: false }))
        try {
          const { data } = await queryFulfilled
          if (isNewChat) {
            dispatch(api.util.invalidateTags([{ type: 'Sessions', id: 'LIST' }]))
          }
        } catch (error) {
          console.error('Error during query:', error)
        }
      },
    }),

    deleteSession: builder.mutation<void, number>({
      query: (id) => ({ url: `/api/delete-session/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) =>
        !error
          ? [
            { type: 'Sessions', id },
            { type: 'Sessions', id: 'LIST' },
          ]
          : [],
    }),
  }),
})

export const { useGetAllSessionsQuery, useGetSessionQuery, useLazyGetSessionQuery, useLazyGetChatHistoryQuery, useGetChatHistoryQuery, useSendMessageMutation, useAddSessionMutation,useDeleteSessionMutation } = chatApi; 