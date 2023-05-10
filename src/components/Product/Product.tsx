import { Link } from 'react-router-dom';
import { Products } from '../../types/types';
import classes from './Product.module.scss';

const Product = (props: { product: Products }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={classes.product__container}>
      <Link to={`/produkt/${props.product._id}`} onClick={handleClick}>
        <div className={classes[`product__container--imgBox`]}>
          <img
            src={props.product.imageUrl}
            alt={props.product.name}
            width={250}
          />
          <div>
            <p>Sprawdź więcej szczegółów</p>
          </div>
        </div>
      </Link>
      <div className={classes[`product__container--textBox`]}>
        <h4>{props.product.name}</h4>
        <p>{props.product.price}zł</p>
      </div>
    </div>
  );
};

export default Product;
