import apiSlice from './apiSlice';
import {
  ResponseType,
  FormResponseType,
  ResetPasswordResponseType,
} from '../../types/types';

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
    putResetSendEmailCode: builder.mutation<
      FormResponseType,
      { email: string }
    >({
      query: ({ email }) => ({
        url: 'auth/reset-send',
        method: 'PUT',
        body: {
          email,
        },
      }),
    }),
    putVerifyCode: builder.mutation<
      ResetPasswordResponseType,
      { code: string }
    >({
      query: ({ code }) => ({
        url: 'auth/send-code',
        method: 'PUT',
        body: {
          code,
        },
      }),
    }),
    putCreateNewPassword: builder.mutation<
      ResetPasswordResponseType,
      { newPassword: string; repeatNewPassword: string; userId: string }
    >({
      query: ({ newPassword, repeatNewPassword, userId }) => ({
        url: 'auth/send-new-password',
        method: 'PUT',
        body: {
          newPassword,
          repeatPassword: repeatNewPassword,
          userId,
        },
      }),
    }),
    putContactMessage: builder.mutation<
      FormResponseType,
      { userName: string; email: string; message: string; subject: string }
    >({
      query: ({ userName, email, message, subject }) => ({
        url: 'auth/contact',
        method: 'PUT',
        body: {
          userName,
          email,
          message,
          subject,
        },
      }),
    }),
    getOrderDetail: builder.query<void, { token: string; orderId: string }>({
      query: ({ orderId, token }) => ({
        url: `auth/getOrder/${orderId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrdersDetail: builder.query<void, string>({
      query: (token) => ({
        url: `auth/getOrders`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getWishlistItems: builder.query<void, string>({
      query: (token) => ({
        url: `auth/getWishlist`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: 'WishlistAction' }],
    }),
    getWishlist: builder.query<void, { productId: string; token: string }>({
      query: ({ token, productId }) => ({
        url: `auth/getWishlist/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: 'WishlistAction' }],
    }),
    postAddToWishList: builder.mutation<
      void,
      { productId: string; token: string }
    >({
      query: ({ productId, token }) => ({
        url: 'auth/add-to-wishlist',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          productId,
        },
      }),
      invalidatesTags: [{ type: 'WishlistAction' }],
    }),
    deleteFromWishList: builder.mutation<
      void,
      { productId: string; token: string }
    >({
      query: ({ productId, token }) => ({
        url: 'auth/remove-from-wishlist',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          productId,
        },
      }),
      invalidatesTags: [{ type: 'WishlistAction' }],
    }),
  }),
});

export const {
  useGetUserIdQuery,
  usePostLoginUserMutation,
  usePutRegisterUserMutation,
  usePostChangeUserPasswordMutation,
  usePostChangeUserEmailMutation,
  usePutResetSendEmailCodeMutation,
  usePutVerifyCodeMutation,
  usePutCreateNewPasswordMutation,
  usePutContactMessageMutation,
  useGetOrderDetailQuery,
  useGetOrdersDetailQuery,
  useGetWishlistItemsQuery,
  useGetWishlistQuery,
  usePostAddToWishListMutation,
  useDeleteFromWishListMutation,
} = userApiSlice;
