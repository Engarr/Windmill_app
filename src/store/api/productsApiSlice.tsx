import apiSlice from './apiSlice';
import { ProductFormResponseType, ProductType } from '../../types/types';

export interface ProductsDetailResponse {
  productDetail: ProductType;
}
export interface ProductsResponse {
  message: string;
  products: ProductType[];
}
export interface FormDataType {
  image?: File;
  name?: string;
  price?: string;
  description?: string;
  category?: string;
  userId?: string;
  imageUrl?: string;
  productId?: string;
  creatorId?: string;
}
const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => 'feed/products',
      providesTags: [{ type: 'ProductManipulate' }],
    }),
    getCategoryProduct: builder.query<ProductsResponse, string>({
      query: (category) => `feed/products/${category}`,
      providesTags: [{ type: 'ProductManipulate' }],
    }),
    getProductDetail: builder.query<ProductsDetailResponse, string>({
      query: (id) => `feed/product/${id}`,
      providesTags: [{ type: 'ProductManipulate' }],
    }),
    getProductsById: builder.query<ProductType[], string[] | undefined>({
      query: (productIds) => ({
        url: 'feed/storage',
        params: {
          ids: productIds?.join(','),
        },
      }),
    }),
    getUserProduct: builder.query<{ products: ProductType[] }, string>({
      query: (token) => ({
        url: 'feed/user-products',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: 'ProductManipulate' }],
    }),
    addProduct: builder.mutation<ProductFormResponseType, FormDataType>({
      query: (FormData) => ({
        url: `feed/add-product`,
        method: 'POST',
        body: FormData,
      }),
      invalidatesTags: [{ type: 'ProductManipulate' }],
    }),
    edditProduct: builder.mutation<
      ProductFormResponseType,
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
      invalidatesTags: [{ type: 'ProductManipulate' }],
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
        invalidatesTags: [{ type: 'ProductManipulate' }],
      }
    ),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
  useGetProductDetailQuery,
  useGetProductsByIdQuery,
  useGetUserProductQuery,
  useAddProductMutation,
  useEdditProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
