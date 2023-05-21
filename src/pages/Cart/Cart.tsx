import { useState, useEffect } from 'react';
import { useGetCartProductsQuery } from '../../store/apiSlice';
import { useRouteLoaderData } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import { cartItemsResponse } from '../../types/types';
import CartProduct from '../../components/CartProduct/CartProduct';

const Cart = () => {
  const token = useRouteLoaderData('root') as string;

  const { data: cartItems, isLoading } = useGetCartProductsQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const productsArr = cartItems?.prodArr;

  return (
    <div>
      {isLoading ? (
        <Spinner message="Ladowanie.." />
      ) : (
        <>
          {productsArr && <CartProduct products={productsArr} token={token} />}
        </>
      )}
    </div>
  );
};

export default Cart;
