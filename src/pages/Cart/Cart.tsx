import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cartItems.items);
  console.log(cartItems);
  return <div>Cart</div>;
};

export default Cart;
