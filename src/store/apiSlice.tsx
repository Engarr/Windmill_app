import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Products, CartProductType } from '../types/types';

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
        url: 'cartFeed/addToCart',
        method: 'PUT',
        body: { productId, userId, quantity },
      }),
    }),
    getCartProducts: builder.query<CartProductType, string>({
      query: (token) => ({
        url: `cartFeed/getCartProducts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  useSendDataToCartMutation,
  useGetCartProductsQuery,
} = productsApi;
