import { api } from './api.config'

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all sessions 
    getAllSessions: builder.query<any, { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 10 } = {}) =>
        `/api/get-all-sessions?skip=${skip}&limit=${limit}`,
      providesTags: (result) =>
        result && result.data
          ? [
            ...result.data.map(({ _id }: { _id: string }) => ({ type: 'session', id: _id })),
            { type: 'session', id: 'LIST' },
          ]
          : [{ type: 'session', id: 'LIST' }],
    }),

    // Get/Create new session (this endpoint does both)
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

    // Get chat history by session ID
    getChatHistory: builder.query<any, string>({
      query: (sessionId) => `/api/get-chat-history/${sessionId}`,
    }),

    // Send message
    sendMessage: builder.mutation<any, { session_id: string; query: string; isFirstChat: boolean }>({
      query: ({ session_id, query }) => ({
        url: `/api/sendMessage?query=${encodeURIComponent(query)}&session_id=${session_id}`,
        method: 'POST',
        headers: { hideSuccessToast: 'false' },
      }),
      async onQueryStarted({ isFirstChat }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (isFirstChat) {
            dispatch(api.util.invalidateTags([{ type: 'session', id: 'LIST' }]));
          }
        } catch (error) {
          console.error('Error during query:', error);
        }
      },
    }),

    // // Send message
    // sendMessage: builder.mutation<any, { session_id: string; query: string, isFirstChat: boolean }>({
    //   query: ({ session_id, query }) => ({
    //     url: '/api/sendMessage',
    //     method: 'POST',
    //     body: { session_id, query },
    //     headers: { hideSuccessToast: 'false' },
    //   }),
    //   async onQueryStarted({ isFirstChat }, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       if (isFirstChat) {
    //         dispatch(
    //           api.util.invalidateTags([{ type: 'Sessions', id: 'LIST' }])
    //         );
    //       }
    //     } catch (error) {
    //       console.error('Error during query:', error);
    //     }
    //   },
    // }),

  }),
})

export const { useGetAllSessionsQuery, useGetSessionQuery, useLazyGetSessionQuery, useLazyGetChatHistoryQuery, useGetChatHistoryQuery, useSendMessageMutation, useAddSessionMutation } = chatApi; 