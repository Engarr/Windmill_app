import { useRouteLoaderData, Link } from 'react-router-dom';
import { useGetCartProductsQuery } from '../../store/api/cartApiSlice';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import CartProduct from '../../components/CartProduct/CartProduct';
import classes from './Cart.module.scss';

const Cart = () => {
  const token = useRouteLoaderData('root') as string;

  const { data: cartItems, isLoading } = useGetCartProductsQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const productsArr = cartItems?.prodArr;

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
    content = <CartProduct products={productsArr} token={token} />;
  }

  return <div>{content}</div>;
};

export default Cart;
