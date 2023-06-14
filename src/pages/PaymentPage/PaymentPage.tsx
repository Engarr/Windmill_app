import { useParams, useRouteLoaderData } from 'react-router-dom';
import classes from './PaymentPage.module.scss';
import { useGetOrderDetailQuery } from '../../store/api/userApiSlice';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import Empty from '../../components/Empty/Empty';
import { OrderType } from '../../types/types';
import payULogo from '../../assets/PAYU_LOGO_LIME-990x640.png';

const PaymentPage = () => {
  const token = useRouteLoaderData('root') as string;
  let orderInfo;
  const params = useParams();
  const orderId = params?.orderId as string;

  const { data, isLoading, isError } = useGetOrderDetailQuery({
    orderId,
    token,
  });
  if (data) {
    orderInfo = data as OrderType;
  }

  let content;
  let paymentContent;
  let totalSum;
  if (orderInfo?.products) {
    const productSum = orderInfo?.products.reduce(
      (sum, { price, quantity }) => {
        const productTotal = price * quantity;
        return (sum + productTotal) as number;
      },
      0
    );
    totalSum = productSum + Number(orderInfo.deliveryMethod.price);
  }

  if (orderInfo?.paymentMethod === 'PayU') {
    paymentContent = (
      <div className={classes[`wrapper__paymentBox--payULogo`]}>
        <img src={payULogo} alt="payULogo" />
        <p>Funckja niezsynchronizowana</p>
        <p>Dokończ płatność</p>
      </div>
    );
  } else {
    paymentContent = (
      <div className={classes[`wrapper__paymentBox--traditionalTransfer`]}>
        <p>
          <span>Nazwa firmy:</span> Polski-Młyn
        </p>

        <p>
          <span>Adres:</span> 37-716 Orły, Ul. Młyńska 29
        </p>

        <p>
          <span>Na rachunek:</span> xx xxxx xxxx xxxx xxxxx xxxx xxxx
        </p>

        <p>
          <span>Tytuł przelewu:</span>
          {orderId}
        </p>

        <p>
          <span>Kwota:</span>
          {totalSum?.toFixed(2)} zł
        </p>
      </div>
    );
  }
  if (isLoading) {
    content = <Spinner message="Ładowanie..." />;
  } else if (isError) {
    content = (
      <Empty
        message="Błąd ładowania. Nie udało się pobrać informacji o zamówieniu"
        width={200}
      />
    );
  } else {
    content = (
      <>
        <div className={classes.container__orderNumber}>
          <p>
            Zamowienie nr: <span>{orderId?.toUpperCase()}</span>
          </p>
        </div>
        <div className={classes.container__thanksBox}>
          <h2>Dziękujemy za zakupy</h2>
          <p>Prosimy o opłacenie zamówienia za pomocą wybranej metody</p>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.wrapper__paymentBox}>
            <div className={classes[`wrapper__paymentBox--title`]}>
              <p>
                Wybrana metoda płatności:
                <span>{orderInfo?.paymentMethod}</span>
              </p>
            </div>
            <div className={classes[`wrapper__paymentBox--payMethod`]}>
              {paymentContent}
            </div>
          </div>
          <div className={classes.wrapper__orderInfo}>
            <div className={classes[`wrapper__orderInfo--title`]}>
              <p>Twoje zamówienie:</p>
            </div>
            <div>
              {orderInfo?.products.map((product) => {
                return (
                  <div
                    key={product._id}
                    className={classes[`wrapper__orderInfo--product`]}
                  >
                    <p>{product.name} </p>
                    <span>
                      {(product.price * product.quantity).toFixed(2)} zł
                    </span>
                  </div>
                );
              })}
              <div className={classes[`wrapper__orderInfo--deliveryMethod`]}>
                <p>{orderInfo?.deliveryMethod.name}</p>
                <span>{orderInfo?.deliveryMethod.price} zł</span>
              </div>
              <div className={classes[`wrapper__orderInfo--totalSum`]}>
                <p>SUMA:</p>
                <span>{totalSum} zł</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <section className={classes.container}>{content}</section>;
};

export default PaymentPage;
