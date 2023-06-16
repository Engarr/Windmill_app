import { useState, useEffect } from 'react';
import { GiTwoCoins } from 'react-icons/gi';
import { AiFillHeart } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import { VscCalendar } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import store from '../../store/store';
import { cartItemAction } from '../../store/cartSlice';
import { ProductType, Products } from '../../types/types';
import classes from './ProductDetail.module.scss';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner/Spinner';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';
import ProductManage from '../ProductManage/ProductManage';
import { useSendDataToCartMutation } from '../../store/api/cartApiSlice';
import { useGetCategoryProductQuery } from '../../store/api/productsApiSlice';
import Empty from '../Empty/Empty';
import WishlistButton from '../Wishlist/WishlistButton';

interface PropsType {
  detail: {
    productDetail: ProductType;
  };
  idUser: string;
}

const ProductDetail = ({ detail, idUser }: PropsType) => {
  const details = detail.productDetail;
  const userId = idUser;
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<Products[]>([]);
  const { category } = details;
  const isAuth = details.creator.toString() === userId;
  const [addProdToCart, { isError, isLoading }] = useSendDataToCartMutation();
  const dispatch = useDispatch();
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

  // the function for fetching products of a given category
  const { data: categoryProductsArr, isLoading: isCategoryProductsLoading } =
    useGetCategoryProductQuery(category);

  const fetchProducts = () => {
    if (!isCategoryProductsLoading && categoryProductsArr) {
      const productsArr = categoryProductsArr.products;
      const newArr = productsArr.filter((item) => item._id !== details._id);

      const shuffledItems = newArr.sort(() => Math.random() - 0.5);
      const maxProducts = shuffledItems.slice(0, 3);

      setProducts(maxProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (categoryProductsArr) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryProductsArr, category, details]);

  // the function for adding product to cart and save it in to backend

  const addItemToCartHandler = async () => {
    try {
      if (userId !== 'notregistered') {
        await addProdToCart({
          productId: details._id,
          quantity,
          userId,
        });
      } else {
        dispatch(
          cartItemAction.onAddItem({
            productId: details._id,
            quantity,
          })
        );
        localStorage.setItem(
          'cartItems',
          JSON.stringify(store.getState().cartItems)
        );
      }

      if (isError) {
        toast.error('Ups... coś poszło nie tak');
      } else {
        toast.success(
          `Produkt:${details.name} sztuk: ${quantity} dodano do koszyka`
        );
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas dodawania produktu do koszyka.');
    }
  };

  let similarContent;
  if (isCategoryProductsLoading) {
    similarContent = <Spinner message="Wczytywanie produktów.." />;
  } else if (products.length > 0) {
    similarContent = (
      <>
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </>
    );
  } else if (products.length === 0) {
    similarContent = (
      <Empty message="Nie posiadamy innych podobnych produktów" width={200} />
    );
  }

  return (
    <>
      <div className={classes.navigation}>
        <div className={classes.navigation__nav}>
          <Link to="/">Strona główna</Link>
          <span>/</span>
          <Link to={`/sklep/${details.category}`}>{details.category}</Link>
          <span>/</span>
          <p className={classes[`navigation__nav--active`]}>{details.name}</p>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.product__imageWrapper}>
          <div>
            <img src={details.imageUrl} alt={details.name} />
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
            {userId !== 'notregistered' && (
              <WishlistButton productId={details._id} />
            )}

            <div className={classes[`product__infoWrapper--description`]}>
              <p>
                <span>Charakterystyka:</span> {details.description}
              </p>
              W
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

          <div className={classes.buttons}>
            <div className={classes.buttons__QtyBox}>
              <div
                onClick={decreaseQuantityHandler}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    decreaseQuantityHandler();
                  }
                }}
                tabIndex={0}
                role="button"
              >
                <button type="button">-</button>
              </div>
              <div>
                <span>{quantity}</span>
              </div>

              <div
                onClick={IncreaseQuantityHandler}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    IncreaseQuantityHandler();
                  }
                }}
                tabIndex={0}
                role="button"
              >
                <button type="button">+</button>
              </div>
            </div>
            <div className={classes.buttons__addBox}>
              {!userId ? (
                <Link to="/konto?mode=login">
                  <button type="button">Dodaj do koszyka</button>
                </Link>
              ) : (
                <button type="button" onClick={addItemToCartHandler}>
                  {!isLoading ? <p> Dodaj do koszyka</p> : <LineWaveLoader />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isAuth && <ProductManage productId={details._id} />}

      <div className={classes.similarlyProduct__container}>
        <div>
          <h2>Podobne produkty:</h2>
        </div>
        <div>{similarContent}</div>
      </div>
    </>
  );
};

export default ProductDetail;
