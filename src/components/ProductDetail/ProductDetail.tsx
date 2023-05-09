import { ProductType } from '../../types/types';
import classes from './ProductDetail.module.scss';
import { GiTwoCoins } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const ProductDetail = (props: { detail: { productDetail: ProductType } }) => {
  const details = props.detail.productDetail;

  return (
    <div className={classes.wrapper}>
      <div className={classes.product__imageWrapper}>
        <div>
          <img src={details.imageUrl} alt={details.name} width={250} />
        </div>
      </div>
      <div className={classes.product__infoWrapper}>
        <div className={classes[`product__infoWrapper--titleBox`]}>
          <div>
            <h2>{details.name}</h2>
          </div>
          <div>
            <p>Kategoria:</p>
            <Link to={`/sklep/${details.category}`}>{details.category}</Link>
          </div>
          <div>
            <p>
              <GiTwoCoins className={classes[`product__infoWrapper--icon`]} />
              {details.price} zł
            </p>
          </div>
        </div>
        <div className={classes[`product__infoWrapper--descriptionBox`]}>
          <div>
            <h4>Opis:</h4>
          </div>
          <div className={classes[`product__infoWrapper--description`]}>
            <p>
              <span>Charakterystyka:</span> {details.description}
            </p>
          </div>
        </div>
        <div>Przyciski</div>
      </div>
    </div>
  );
};

export default ProductDetail;
