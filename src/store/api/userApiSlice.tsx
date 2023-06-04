import apiSlice from './apiSlice';
import { ResponseType } from '../../types/types';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserId: builder.query<string, string | undefined>({
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
    postChangeUserPassword: builder.mutation<
      void,
      {
        oldPassword: string;
        newPassword: string;
        repeatNewPassword: string;
        token: string;
      }
    >({
      query: ({ token, oldPassword, newPassword, repeatNewPassword }) => ({
        url: `auth/change-password`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          oldPassword,
          newPassword,
          repeatNewPassword,
        },
      }),
    }),
    postChangeUserEmail: builder.mutation<
      void,
      {
        password: string;
        newEmail: string;
        token: string;
      }
    >({
      query: ({ token, password, newEmail }) => ({
        url: `auth/change-email`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          password,
          newEmail,
        },
      }),
    }),
  }),
});
// eslint-disable-next-line import/prefer-default-export
export const {
  useGetUserIdQuery,
  usePostLoginUserMutation,
  usePutRegisterUserMutation,
  usePostChangeUserPasswordMutation,
  usePostChangeUserEmailMutation,
} = userApiSlice;
