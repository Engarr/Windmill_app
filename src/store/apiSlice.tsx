import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Products } from '../types/types';

interface ProductsResponse {
  message: string;
  products: Products[];
}

interface ProductsDetailsResponse {
  message: string;
  productDetail: Products[];
}
interface UserResponse {
  message: string;
  userId: string;
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
  }),
});

export const { useGetAllProductsQuery, useGetCategoryProductQuery } =
  productsApi;
