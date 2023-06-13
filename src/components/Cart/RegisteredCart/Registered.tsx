import { useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useGetCartProductsQuery,
  useIncreaseQtyMutation,
  useDecreaseQtyMutation,
  useDeleteCartProductMutation,
} from '../../../store/api/cartApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';
import CartProduct from '../../CartProduct/CartProduct';
import EmptyCart from '../../Empty/EmptyCart';

const RegisteredCart = () => {
  const token = useRouteLoaderData('root') as string;

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useGetCartProductsQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [increaseQty] = useIncreaseQtyMutation();
  const [decreaseQty] = useDecreaseQtyMutation();
  const [deleteProductFromCart] = useDeleteCartProductMutation();

  const productsArr = cartItems?.prodArr;

  const increaseHandler = async (id: string, tokenNum?: string) => {
    try {
      if (tokenNum) {
        await increaseQty({
          id,
          tokenNum,
        });
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak');
    }
  };

  const decreaseHandler = async (id: string, tokenNum?: string) => {
    try {
      if (tokenNum) {
        await decreaseQty({
          id,
          tokenNum,
        });
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak');
    }
  };
  const removeProduct = async (prodId: string, name: string) => {
    if (token !== 'null') {
      try {
        toast.success(`Produkt: ${name} został usunięty z koszyka`);
        await deleteProductFromCart({
          productId: prodId,
          token,
        });
      } catch (error) {
        toast.error('Wystąpił błąd podczas dodawania produktu do koszyka.');
      }
    }
  };

  let content;
  if (isLoading) {
    content = <Spinner message="Ladowanie.." />;
  } else if (productsArr && productsArr?.length <= 0) {
    content = <EmptyCart message="Twój koszyk jest pusty" />;
  } else if (isError) {
    content = (
      <EmptyCart message="Niestety nie udało się pobrać informacji o zawartości koszyka" />
    );
  } else if (productsArr) {
    content = (
      <CartProduct
        products={productsArr}
        token={token}
        increaseHandler={increaseHandler}
        decreaseHandler={decreaseHandler}
        removeProduct={removeProduct}
      />
    );
  }

  return <div>{content}</div>;
};

export default RegisteredCart;
