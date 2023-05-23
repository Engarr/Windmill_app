import { Link } from 'react-router-dom';
import { Products } from '../../types/types';
import classes from './Product.module.scss';

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
          <img src={product.imageUrl} alt={product.name} width={250} />
          <div>
            <p>Sprawdź więcej szczegółów</p>
          </div>
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
