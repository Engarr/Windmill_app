import { useState } from 'react';
import { useRouteLoaderData, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  useGetCartProductsQuery,
  useSendOrderMutation,
  useClearCartMutation,
} from '../../store/api/cartApiSlice';
import { useGetProductsByIdQuery } from '../../store/api/productsApiSlice';
import { RootState } from '../../store/store';
import {
  ProductType,
  ErrorOrderPageType,
  ResponseType,
} from '../../types/types';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import classes from './OrderPage.module.scss';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import DeliveryMethod from '../../components/DeliveryMethod/DeliveryMethod';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';
import EmptyCart from '../../components/Empty/EmptyCart';
import { cartItemAction } from '../../store/cartSlice';

interface StorageItemsArrType {
  data: {
    products: ProductType[];
  };
  isLoading: boolean;
  isError: boolean;
}
interface ProductArrType {
  product: ProductType;
  quantity: number;
}

const OrderPage = () => {
  const token = useRouteLoaderData('root') as string;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let productsArr: ProductArrType[] = [];
  let totalSum = 0;
  const [orderData, setOrderData] = useState({
    name: 'dsa',
    surname: 'dsa',
    companyName: 'sda',
    city: 'sad',
    street: 'das',
    zipCode: '12123',
    phone: '123123123',
    email: 'poczta@poczta.pl',
    message: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('Przelew bankowy');
  const [status, setStatus] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState({
    name: 'Kurier DPD',
    price: 14.99,
  });
  const [backendErrors, setBackendErrors] = useState<ErrorOrderPageType>({});
  // The endpoint of sending the order to the backend
  const [onSendOrder, { isLoading: isLoadingSendingOrder }] =
    useSendOrderMutation();
  // The endpoint of clearing user cart in database
  const [onClearCart, { isLoading: isClearCartLoading }] =
    useClearCartMutation();
  // The endpoint of fetching products from user cart for registered user
  const {
    data: cartItems,
    isLoading: cartItemsLoading,
    isError: cartItemsError,
  } = useGetCartProductsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  // Fetching products from database by saved products on the localt storage
  const storageItems = useSelector((state: RootState) => state.cartItems.items);
  const idArr = storageItems.map(({ productId }) => productId);

  const {
    data: storageItemsArr,
    isLoading: storageItemsLoading,
    isError: storageItemsArrError,
  } = useGetProductsByIdQuery<StorageItemsArrType>(
    idArr.length > 0 ? idArr : undefined
  );
  // Assigning products depending on whether the user is registered or not

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
  // Calculation of the total value of the basket
  if (productsArr) {
    totalSum = productsArr.reduce((sum, { product, quantity }) => {
      const productTotal = product.price * quantity;
      return (sum + productTotal) as number;
    }, 0);
  }

  if (cartItemsLoading || storageItemsLoading) {
    return <Spinner message="Ładowanie..." />;
  }
  if (productsArr.length <= 0) {
    return <EmptyCart message="Nie posiadasz produktów w koszyku" />;
  }
  if (cartItemsError || storageItemsArrError) {
    return (
      <EmptyCart message="Niestety nie udało się pobrać informacji o zawartości koszyka" />
    );
  }
  // The function of sending an order to the database using the useSendOrderMutation endpoint
  const sendOrderHandler = async () => {
    try {
      const response = await onSendOrder({
        orderData,
        productsArr,
        paymentMethod,
        status,
        deliveryMethod,
        token,
      });
      const resData = response as ResponseType;
      if (resData.error) {
        window.scroll(0, 0);
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setBackendErrors(errorsObj);
      } else if (!token) {
        dispatch(cartItemAction.onClearCart());
        navigate(`/platnosc/${resData.data.orderId}`);
      } else {
        await onClearCart(token);
        navigate(`/platnosc/${resData.data.orderId}`);
      }
    } catch (err) {
      toast.error('Coś poszło nie tak, spróbuj ponownie później');
      throw new Error('Coś poszło nie tak, spróbuj ponownie później');
    }
  };

  if (isClearCartLoading || isLoadingSendingOrder) {
    return <Spinner message="Ładowanie..." />;
  }

  return (
    <div className={classes.orderContainer}>
      <DeliveryForm
        setOrderData={setOrderData}
        orderData={orderData}
        backendErrors={backendErrors}
        setBackendErrors={setBackendErrors}
      />
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
                <div
                  className={classes[`orderContainer__orders--product-info`]}
                >
                  <p>{product.product?.name}</p>
                  <p>ilość: {product.quantity}</p>
                </div>
                <div
                  className={classes[`orderContainer__orders--product-price`]}
                >
                  <p>
                    {(product.quantity * product.product.price).toFixed(2)}
                    zł
                  </p>
                </div>
              </div>
            ))}
        </div>
        <DeliveryMethod
          totalSum={totalSum}
          setDeliveryMethod={setDeliveryMethod}
        />
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setStatus={setStatus}
          status={status}
          backendErrors={backendErrors}
        />
        <button
          className={classes.submitButton}
          type="button"
          onClick={sendOrderHandler}
        >
          Kupuje i płacę
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
