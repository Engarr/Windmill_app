import { useGetCartProductsQuery } from '../../store/apiSlice';
import { useRouteLoaderData } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';

const Cart = () => {
  const token = useRouteLoaderData('root') as string;

  const { data: cartItems, isLoading } = useGetCartProductsQuery(token);
  console.log(cartItems);
  return <div>{isLoading ? <Spinner message="Ladowanie.." /> : <></>}</div>;
};

export default Cart;
