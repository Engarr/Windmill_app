import { useGetCartProductsQuery } from '../../store/apiSlice';
import { useRouteLoaderData } from 'react-router-dom';

const Cart = () => {
  const token = useRouteLoaderData('root') as string;

  const { data } = useGetCartProductsQuery(token);

  return <div>Cart</div>;
};

export default Cart;
