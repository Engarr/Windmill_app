import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Products, ProductType } from '../types/types';

interface ProductsResponse {
  message: string;
  products: Products[];
}

interface ProductsDetailsResponse {
  productDetail: ProductType;
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
    
    // getUserId: builder.query<{ userId: string | boolean }, string>({
    //   query: (token) => ({
    //     url: 'feed/user',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  // useGetProductDetailsQuery,
  // useGetUserIdQuery,
} = productsApi;
