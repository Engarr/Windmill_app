import apiSlice from './apiSlice';
import {
  CartItemsResponse,
  ProductType,
  OrderDataType,
} from '../../types/types';

interface ProductArrType {
  product: ProductType;
  quantity: number;
}

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    getCartProducts: builder.query<CartItemsResponse, string>({
      query: (token) => ({
        url: `cartFeed/getCartProducts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: [{ type: 'CartFeed' }],
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
    increaseQty: builder.mutation<void, { id: string; tokenNum: string }>({
      query: ({ id, tokenNum }) => ({
        url: `cartFeed/product-incQty/${id}`,
        headers: { Authorization: `Bearer ${tokenNum}` },
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'CartFeed' }],
    }),
    decreaseQty: builder.mutation<void, { id: string; tokenNum: string }>({
      query: ({ id, tokenNum }) => ({
        url: `cartFeed/product-decQty/${id}`,
        headers: { Authorization: `Bearer ${tokenNum}` },
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'CartFeed' }],
    }),
    sendOrder: builder.mutation<
      void,
      {
        productsArr: ProductArrType[];
        orderData: OrderDataType;
        status: boolean;
        paymentMethod: string;
        deliveryMethod: { name: string; price: number };
        token: string;
      }
    >({
      query: ({
        token,
        productsArr,
        orderData,
        status,
        paymentMethod,
        deliveryMethod,
      }) => ({
        url: 'cartFeed/send-order',
        method: 'POST',
        body: {
          token,
          productsArr,
          name: orderData.name,
          surname: orderData.surname,
          companyName: orderData.companyName,
          city: orderData.city,
          street: orderData.street,
          zipCode: orderData.zipCode,
          phone: orderData.phone,
          email: orderData.email,
          message: orderData.message,
          status,
          paymentMethod,
          deliveryMethod,
        },
      }),
    }),
    clearCart: builder.mutation<void, string>({
      query: (token) => ({
        url: `cartFeed/clearCart`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
      }),
      invalidatesTags: ['CartFeed', 'ProductManipulate'],
    }),
  }),
});
export const {
  useSendDataToCartMutation,
  useGetCartProductsQuery,
  useDeleteCartProductMutation,
  useIncreaseQtyMutation,
  useDecreaseQtyMutation,
  useSendOrderMutation,
  useClearCartMutation,
} = cartApiSlice;
