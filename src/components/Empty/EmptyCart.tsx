import { Link } from 'react-router-dom';
import classes from './EmptyCart.module.scss';

interface PropsType {
  message: string;
}
const EmptyCart = ({ message }: PropsType) => {
  return (
    <div className={classes.emptyCart}>
      <h2>{message}</h2>

      <Link to="/sklep">
        <button type="button">Wróć do sklepu</button>
      </Link>
    </div>
  );
};

export default EmptyCart;
