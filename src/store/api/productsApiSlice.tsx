import apiSlice from './apiSlice';
import { ProductType } from '../../types/types';

export interface ProductsDetailResponse {
  productDetail: ProductType;
}
export interface ProductsResponse {
  message: string;
  products: ProductType[];
}
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'feed/products',
    }),
    getCategoryProduct: builder.query<ProductsResponse, string>({
      query: (category) => `feed/products/${category}`,
    }),
    getProductDetail: builder.query<ProductsDetailResponse, string>({
      query: (id) => `feed/product/${id}`,
    }),
    deleteProduct: builder.mutation<void, { productId: string; token: string }>(
      {
        query: ({ productId, token }) => ({
          url: `feed/delete/${productId}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }
    ),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  useGetProductDetailQuery,
  useDeleteProductMutation,
} = productsApiSlice;
