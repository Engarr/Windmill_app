import apiSlice from './apiSlice';
import { ProductType } from '../../types/types';

export interface ProductsDetailResponse {
  productDetail: ProductType;
}
export interface ProductsResponse {
  message: string;
  products: ProductType[];
}
export interface FormDataType {
  image: File;
  name: string;
  price: string;
  description: string;
  category: string;
  userId: string;
  imageUrl?: string;
  productId?: string;
  creatorId?: string;
}
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'feed/products',
      providesTags: [{ type: 'ProductDelete' }],
    }),
    getCategoryProduct: builder.query<ProductsResponse, string>({
      query: (category) => `feed/products/${category}`,
    }),
    getProductDetail: builder.query<ProductsDetailResponse, string>({
      query: (id) => `feed/product/${id}`,
    }),
    getProductsById: builder.query<ProductType[], string[] | undefined>({
      query: (productIds) => ({
        url: 'feed/storage',
        params: {
          ids: productIds?.join(','),
        },
      }),
    }),
    addProduct: builder.mutation<void, FormDataType>({
      query: (FormData) => ({
        url: `feed/add-product`,
        method: 'POST',
        body: FormData,
      }),
    }),
    edditProduct: builder.mutation<
      void,
      { formData: FormDataType; id: string; token: string }
    >({
      query: ({ formData, id, token }) => ({
        url: `/feed/editProduct/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
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
        invalidatesTags: [{ type: 'ProductDelete' }],
      }
    ),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  useGetProductDetailQuery,
  useGetProductsByIdQuery,
  useAddProductMutation,
  useEdditProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
