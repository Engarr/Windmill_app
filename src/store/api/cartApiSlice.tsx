import apiSlice from './apiSlice';
import { CartItemsResponse } from '../../types/types';

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartProducts: builder.query<CartItemsResponse, string>({
      query: (token) => ({
        url: `cartFeed/getCartProducts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: [{ type: 'CartFeed' }],
    }),
    sendDataToCart: builder.mutation<
      void,
      { productId: string; userId: string; quantity: number }
    >({
      query: ({ productId, userId, quantity }) => ({
        url: 'cartFeed/addToCart',
        method: 'PUT',
        body: { productId, userId, quantity },
      }),
      invalidatesTags: [{ type: 'CartFeed' }],
    }),
    deleteCartProduct: builder.mutation<
      void,
      { productId: string; token?: string }
    >({
      query: ({ token, productId }) => ({
        url: 'cartFeed/deleteProduct',
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
        body: { productId },
      }),
      invalidatesTags: [{ type: 'CartFeed' }],
    }),
  }),
});
export const {
  useSendDataToCartMutation,
  useGetCartProductsQuery,
  useDeleteCartProductMutation,
} = cartApiSlice;
