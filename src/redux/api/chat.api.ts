import { sendMessageResponse } from '@/dto';
import { setNewChat } from '../slice/chat.slice';
import { api } from './api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types';
import { TGetSessionListResponse } from '@/types/session';

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessions: builder.query<TPaginationApiResponse<TGetSessionListResponse>, TPaginationApiParams>({
      query: (params) => ({ url: '/api/get-all-sessions', params }),
      providesTags: (result, error) =>
        !error && result?.list
          ? [
            ...result.list.map(({ _id }: { _id: string }) => ({
              type: "Sessions" as const,
              id: _id,
            })),
            { type: "Sessions" as const, id: "LIST" },
          ]
          : [{ type: "Sessions" as const, id: "LIST" }],
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
      query: (id) => ({ url: `/api/delete-session?session_id=${id}`, method: 'DELETE' }),
      //   invalidatesTags: (result, error, id) =>
      //     !error
      //       ? [
      //         { type: 'Sessions', id },
      //         { type: 'Sessions', id: 'LIST' },
      //       ]
      //       : [],
      invalidatesTags: [{ type: "Sessions", id: "LIST" }],
    }),
  }),
})

export const { useGetAllSessionsQuery, useGetSessionQuery, useLazyGetSessionQuery, useLazyGetChatHistoryQuery, useGetChatHistoryQuery, useSendMessageMutation, useAddSessionMutation, useDeleteSessionMutation, useLazyGetAllSessionsQuery } = chatApi; 