import { useRouteLoaderData, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCartProductsQuery } from '../../store/api/cartApiSlice';
import { useGetProductsByIdQuery } from '../../store/api/productsApiSlice';
import { RootState } from '../../store/store';
import { ProductType } from '../../types/types';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import classes from './OrderPage.module.scss';

interface StorageItemsArrType {
  data: {
    products: ProductType[];
  };
  isLoading: boolean;
}
interface ProductArrType {
  product: ProductType;
  quantity: number;
}

const OrderPage = () => {
  const token = useRouteLoaderData('root') as string;

  let productsArr: ProductArrType[] = [];

  const { data: cartItems, isLoading: cartItemsLoading } =
    useGetCartProductsQuery(token, {
      refetchOnMountOrArgChange: true,
    });

  const storageItems = useSelector((state: RootState) => state.cartItems.items);
  const idArr = storageItems.map(({ productId }) => productId);

  const { data: storageItemsArr, isLoading: storageItemsLoading } =
    useGetProductsByIdQuery<StorageItemsArrType>(
      idArr.length > 0 ? idArr : undefined
    );
  if (token && cartItems) {
    productsArr = cartItems.prodArr;
  } else if (storageItems && storageItemsArr?.products) {
    productsArr = storageItems.map((item) => {
      const product = storageItemsArr.products.find(
        (p) => p._id === item.productId
      );
      return {
        product,
        quantity: item.quantity,
      } as ProductArrType;
    });
  }
  if (cartItemsLoading || storageItemsLoading) {
    return <Spinner message="Ładowanie..." />;
  }
  return (
    <div className={classes.orderContainer}>
      <div className={classes.orderContainer__orders}>
        <div className={classes[`orderContainer__orders--title`]}>
          <h2>Twoje zamówienie</h2>
          <Link to="/koszyk">
            <button type="button">Edytuj koszyk</button>
          </Link>
        </div>
        <div className={classes[`orderContainer__orders--products`]}>
          {productsArr &&
            productsArr.map((product) => (
              <div
                key={product.product?._id}
                className={classes[`orderContainer__orders--product`]}
              >
                <div>
                  <img
                    src={product.product?.imageUrl}
                    alt={product.product.name}
                    width={100}
                  />
                </div>
                <div>
                  <p>{product.product?.name}</p>
                  <p>ilość: {product.quantity}</p>
                </div>
                <div>
                  <p>
                    {(product.quantity * product.product.price).toFixed(2)}
                    zł
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>Formularz</div>
    </div>
  );
};

export default OrderPage;
