import apiSlice from './apiSlice';
import { Products } from '../../types/types';

interface ProductsResponse {
  message: string;
  products: Products[];
}
const productsApiSlice = apiSlice.injectEndpoints({
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
  productsApiSlice;
