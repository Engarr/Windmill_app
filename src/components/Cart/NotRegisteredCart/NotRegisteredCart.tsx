import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemAction } from '../../../store/cartSlice';
import { useGetProductsByIdQuery } from '../../../store/api/productsApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';
import CartProduct from '../../CartProduct/CartProduct';
import store, { RootState } from '../../../store/store';
import { ProductType } from '../../../types/types';
import EmptyCart from '../../Empty/EmptyCart';

interface StorageItemsArrType {
  data: {
    products: ProductType[];
  };
  isLoading: boolean;
  isError: boolean;
}

const NotRegisteredCart = () => {
  const dispatch = useDispatch();
  const storageItems = useSelector((state: RootState) => state.cartItems.items);
  const idArr = storageItems.map(({ productId }) => productId);

  const {
    data: storageItemsArr,
    isLoading,
    isError,
  } = useGetProductsByIdQuery<StorageItemsArrType>(
    idArr.length > 0 ? idArr : undefined
  );
  const newArr = useMemo(() => {
    if (storageItems && storageItemsArr?.products) {
      return storageItems.map((item) => {
        const product = storageItemsArr.products.find(
          (p) => p._id === item.productId
        );
        return {
          product,
          quantity: item.quantity,
        };
      });
    }
    return [];
  }, [storageItems, storageItemsArr]);

  const increaseHandler = (id: string) => {
    dispatch(cartItemAction.onIncreaseQty(id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(store.getState().cartItems)
    );
  };
  const decreaseHandler = (id: string) => {
    dispatch(cartItemAction.onDecreaseQty(id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(store.getState().cartItems)
    );
  };
  const removeProduct = (id: string) => {
    dispatch(cartItemAction.onRemoveProduct(id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(store.getState().cartItems)
    );
  };
  let content;
  if (isLoading) {
    content = <Spinner message="Ladowanie.." />;
  } else if (isError) {
    content = (
      <EmptyCart message="Niestety nie udało się pobrać informacji o zawartości koszyka" />
    );
  } else if (newArr && newArr.length <= 0) {
    content = <EmptyCart message="Twój koszyk jest pusty" />;
  } else if (newArr) {
    content = (
      <CartProduct
        products={newArr as []}
        increaseHandler={increaseHandler}
        decreaseHandler={decreaseHandler}
        removeProduct={removeProduct}
      />
    );
  }

  return <div>{content}</div>;
};
export default NotRegisteredCart;
