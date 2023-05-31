import { useEffect } from 'react';
import { useRouteLoaderData, Link } from 'react-router-dom';
import {
  useGetCartProductsQuery,
  useIncreaseQtyMutation,
  useDecreaseQtyMutation,
} from '../../../store/api/cartApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';
import CartProduct from '../../CartProduct/CartProduct';
import classes from '../../../pages/Cart/Cart.module.scss';

const RegisteredCart = () => {
  const token = useRouteLoaderData('root') as string;

  const { data: cartItems, isLoading } = useGetCartProductsQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [increaseQty] = useIncreaseQtyMutation();
  const [decreaseQty] = useDecreaseQtyMutation();

  const productsArr = cartItems?.prodArr;

  const increaseHandler = async (id: string, tokenNum?: string) => {
    try {
      if (tokenNum) {
        await increaseQty({
          id,
          tokenNum,
        }).unwrap();
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
        }).unwrap();
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak');
    }
  };

  let content;
  if (isLoading) {
    content = <Spinner message="Ladowanie.." />;
  } else if (productsArr && productsArr?.length <= 0) {
    content = (
      <div className={classes.emptyCart}>
        <h2>Twój koszyk jest pusty</h2>
        <Link to="/sklep">
          <button type="button">Wróć do sklepu</button>
        </Link>
      </div>
    );
  } else if (productsArr) {
    content = (
      <CartProduct
        products={productsArr}
        token={token}
        increaseHandler={increaseHandler}
        decreaseHandler={decreaseHandler}
      />
    );
  }

  return <div>{content}</div>;
};

export default RegisteredCart;
