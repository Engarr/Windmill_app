import { Link } from 'react-router-dom';
import { Products } from '../../types/types';
import classes from './Product.module.scss';
import Spinner from '../Spinner/Spinner/Spinner';

interface PropsType {
  product: Products;
}
const Product = ({ product }: PropsType) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={classes.product__container}>
      <Link to={`/produkt/${product._id}`} onClick={handleClick}>
        <div className={classes[`product__container--imgBox`]}>
          {!product.imageUrl ? (
            <div className={classes.spinnerBox}>
              <Spinner />
            </div>
          ) : (
            <img src={product.imageUrl} alt={product.name} width={250} />
          )}
          <p>Sprawdź więcej szczegółów</p>
        </div>
      </Link>
      <div className={classes[`product__container--textBox`]}>
        <h4>{product.name}</h4>
        <p>{product.price}zł</p>
      </div>
    </div>
  );
};

export default Product;
