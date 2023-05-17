import { useState, useEffect } from 'react';
import { ProductType } from '../../types/types';
import classes from './ProductDetail.module.scss';
import { GiTwoCoins } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { VscCalendar } from 'react-icons/vsc';
import { TbTruckDelivery } from 'react-icons/tb';
import { Products } from '../../types/types';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner/Spinner';
import ProductManage from '../ProductManage/ProductManage';

const ProductDetail = (props: {
  productDetails?: ProductType;
  userId?: string | null;
}) => {
  const details = props.productDetails;
  const userId = props.userId;
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const category = details?.category;

  const isAuth = details?.creator?.toString() === userId;

  const IncreaseQuantityHandler = () => {
    setQuantity(quantity + 1);
    if (quantity >= 10) {
      setQuantity(quantity);
    }
  };
  const decreaseQuantityHandler = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };
  //the function for fetching products of a given category
  const fetchProducts = async () => {
    setisLoading(true);
    const url =
      import.meta.env.VITE_REACT_APP_API_URL + `feed/products/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    const productsArr = data.products;

    const newArr = await productsArr.filter(
      (item: ProductType) => item._id !== details?._id
    );

    let shuffledItems = await newArr.sort(() => Math.random() - 0.5);
    let maxProducts = await shuffledItems.slice(0, 3);

    setProducts(maxProducts);
    setisLoading(false);
  };
  useEffect(() => {
    setProducts([]);
    fetchProducts();
  }, [category, details]);

  return (
    <>
      {isAuth && <ProductManage />}

      <div className={classes.wrapper}>
        <div className={classes.product__imageWrapper}>
          <div>
            <img src={details?.imageUrl} alt={details?.name} width={250} />
          </div>
        </div>
        <div className={classes.product__infoWrapper}>
          <div className={classes[`product__infoWrapper--titleBox`]}>
            <div>
              <h2>{details?.name}</h2>
            </div>
            <div>
              <p>Kategoria:</p>
              <Link to={`/sklep/${details?.category}`}>
                {details?.category}
              </Link>
            </div>
            <div>
              <p>
                <GiTwoCoins className={classes[`product__infoWrapper--icon`]} />
                {details?.price} zł
              </p>
            </div>
          </div>
          <div className={classes[`product__infoWrapper--descriptionBox`]}>
            <div>
              <h4>Opis:</h4>
            </div>
            <div className={classes[`product__infoWrapper--description`]}>
              <p>
                <span>Charakterystyka:</span> {details?.description}
              </p>
            </div>
          </div>

          <div className={classes[`product__infoWrapper--detailsBox`]}>
            <div>
              <VscCalendar
                className={classes[`product__infoWrapper--detailsBox-icon`]}
              />
              <p>
                Czas realizacji <span>1-2 dni</span> robocze
              </p>
            </div>
            <div>
              <TbTruckDelivery
                className={classes[`product__infoWrapper--detailsBox-icon`]}
              />
              <p>
                Wysyłka od <span>9,99 zł</span>
              </p>
            </div>
          </div>

          <div className={classes[`buttons`]}>
            <div className={classes[`buttons__QtyBox`]}>
              <div onClick={IncreaseQuantityHandler}>
                <button>+</button>
              </div>
              <div>
                <span>{quantity}</span>
              </div>
              <div onClick={decreaseQuantityHandler}>
                <button>-</button>
              </div>
            </div>
            <div className={classes[`buttons__addBox`]}>
              <button>Dodaj do koszyka</button>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.similarlyProduct__container}>
        <div>
          <h2>Podobne produkty:</h2>
        </div>
        <div>
          {isLoading ? (
            <Spinner message="Wczytywanie produktów.." />
          ) : products.length > 0 ? (
            <>
              {products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
            </>
          ) : (
            <div className={classes.empty}>
              <h2>Wystąpił błąd, spróbuj ponownie później</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
