import { useRouteLoaderData } from 'react-router-dom';

import RegisteredCart from '../../components/Cart/RegisteredCart/Registered';
import NotRegisteredCart from '../../components/Cart/NotRegisteredCart/NotRegisteredCart';

const Cart = () => {
  const token = useRouteLoaderData('root') as string;

  let content;
  if (token) {
    content = <RegisteredCart />;
  } else {
    content = <NotRegisteredCart />;
  }

  return <div>{content}</div>;
};

export default Cart;
