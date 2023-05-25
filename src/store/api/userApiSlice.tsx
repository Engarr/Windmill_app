import apiSlice from './apiSlice';
import { ResponseType } from '../../types/types';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserId: builder.query<string, string | null>({
      query: (token) => ({
        url: 'feed/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    postLoginUser: builder.mutation<
      ResponseType,
      { mode: string; email: string; password: string }
    >({
      query: ({ mode, email, password }) => ({
        url: `auth/${mode}`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    putRegisterUser: builder.mutation<
      ResponseType,
      { mode: string; email: string; password: string; repeatPassword: string }
    >({
      query: ({ mode, email, password, repeatPassword }) => ({
        url: `auth/${mode}`,
        method: 'PUT',
        body: { email, password, repeatPassword },
      }),
    }),
  }),
});
// eslint-disable-next-line import/prefer-default-export
export const {
  useGetUserIdQuery,
  usePostLoginUserMutation,
  usePutRegisterUserMutation,
} = userApiSlice;
