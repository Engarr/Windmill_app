import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Products, cartItemsResponse } from '../types/types';

interface ProductsResponse {
  message: string;
  products: Products[];
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  }),
  tagTypes: ['CartFeed'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'feed/products',
    }),
    getCategoryProduct: builder.query<ProductsResponse, string>({
      query: (category) => `feed/products/${category}`,
    }),
    getCartProducts: builder.query<cartItemsResponse, string>({
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
      { productId: string; token: string }
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
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  useSendDataToCartMutation,
  useGetCartProductsQuery,
  useDeleteCartProductMutation,
} = productsApi;
