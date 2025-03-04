import { api } from './api.config'
import { UserDTO } from '@/dto'
import { updateUser } from '../slice/user.slice'
import { setUser } from '@/utils'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: Omit<UserDTO, 'profile'> }, { email: string; password: string; recaptchaToken: string }>({
      query: (body) => ({
        url: '/api/login',
        method: 'POST',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
    }),

    register: builder.mutation<{ token: string; user: UserDTO }, any>({
      query: (body) => ({
        url: '/api/register',
        method: 'POST',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data: { token, user } }) => {
            setUser({ token, redirection: false })
            dispatch(updateUser(user))
          })
          .catch(() => { })
      },
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({ url: '/api/forgetPassword', method: 'POST', body }),
    }),

    resetPassword: builder.mutation<void, { token: string; password: string }>({
      query: ({ token, ...body }) => ({ url: `/api/changePassword/${token}`, method: 'PUT', body }),
    }),

    updatePassword: builder.mutation<void, { password: string }>({
      query: (body) => ({ url: `/api/updatePassword`, method: 'PUT', body }),
    }),

    updateUser: builder.mutation<{ token: string; user: UserDTO }, any>({
      query: (body) => ({
        url: '/api/updateUser',
        method: 'PUT',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data: { user } }) => {
            dispatch(updateUser(user))
          })
          .catch(() => { })
      },
    }),

    getUser: builder.query<UserDTO, void>({
      query: () => '/api/getProfile',
      // providesTags: ['profile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(({ data }) => dispatch(updateUser(data))).catch(() => { })
      },
    }),

  }),
})

export const { useLoginMutation, useRegisterMutation, useUpdateUserMutation, useLazyGetUserQuery, useForgotPasswordMutation, useResetPasswordMutation, useUpdatePasswordMutation } = extendedApi
