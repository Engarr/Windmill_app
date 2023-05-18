import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Products } from '../types/types';

interface ProductsResponse {
  message: string;
  products: Products[];
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'feed/products',
    }),
    getCategoryProduct: builder.query<ProductsResponse, string>({
      query: (category) => `feed/products/${category}`,
    }),
    sendDataToCart: builder.mutation<
      void,
      { productId: string; userId: string; quantity: number }
    >({
      query: ({ productId, userId, quantity }) => ({
        url: 'feed/addToCart',
        method: 'PUT',
        body: { productId, userId, quantity },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  useSendDataToCartMutation,
} = productsApi;
