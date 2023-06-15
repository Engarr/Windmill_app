import { useParams, useRouteLoaderData, Link } from 'react-router-dom';
import classes from './OrderDetailPage.module.scss';
import { useGetOrderDetailQuery } from '../../store/api/userApiSlice';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import Empty from '../../components/Empty/Empty';
import { OrderType } from '../../types/types';

const OrderDetailPage = () => {
  const token = useRouteLoaderData('root') as string;
  let orderDetails;
  let formattedTime;
  let totalCost = 0;
  let formattedDate;
  const params = useParams();
  const orderId = params?.orderId as string;

  const { data, isLoading, isError } = useGetOrderDetailQuery({
    orderId,
    token,
  });
  if (data) {
    orderDetails = data as OrderType;
  }

  const payStatusStyle = !orderDetails?.paid ? classes.unpaid : classes.paid;

  if (orderDetails) {
    const orderDate = new Date(orderDetails.date);
    formattedDate = orderDate.toLocaleString('pl-PL', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const hours = orderDate.getHours().toString().padStart(2, '0');
    const minutes = orderDate.getMinutes().toString().padStart(2, '0');
    formattedTime = `${hours}:${minutes}`;
    const productsTotal = orderDetails.products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    totalCost = productsTotal + Number(orderDetails.deliveryMethod.price);
  }

  let content;
  if (isLoading) {
    content = <Spinner message="Ładowanie.." />;
  } else if (isError) {
    content = (
      <Empty
        message="Błąd ładowania. Nie udało się pobrać informacji o zamówieniu"
        width={200}
      />
    );
  } else {
    content = (
      <div className={classes.wrapper}>
        <div className={classes.wrapper__orderTitle}>
          <p>
            Zamówienie nr: <span>{orderDetails?._id}</span>
          </p>
          <p>
            Data zakupu: <span>{formattedDate}</span>, godz.
            <span>{formattedTime}</span>
          </p>
        </div>
        <div className={classes.wrapper__orderDetails}>
          <div className={classes.orderBox}>
            <h4>Produkty:</h4>
            {orderDetails?.products.map((product) => {
              return (
                <div key={product._id} className={classes.orderBox__order}>
                  <div className={classes[`orderBox__order--name`]}>
                    <Link to={`/produkt/${product._id}`}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={100}
                      />
                    </Link>
                    <Link to={`/produkt/${product._id}`}>
                      <p>{product.name}</p>
                    </Link>
                  </div>
                  <div className={classes[`orderBox__order--price`]}>
                    <p>{product.quantity} x</p>
                    <p>{product.price} zł</p>
                    <span>{product.quantity * product.price} zł</span>
                  </div>
                </div>
              );
            })}
            <div className={classes.orderBox__details}>
              <div>
                <p>
                  Metoda dostawy:
                  <span>{orderDetails?.deliveryMethod.name}</span>
                </p>
              </div>
              <div>
                <p>
                  Koszt dostawy:
                  <span>{orderDetails?.deliveryMethod.price} zł</span>
                </p>
              </div>
              <div>
                <p>
                  Całkowity koszt Zamowienia:
                  <span>{totalCost} zł</span>
                </p>
              </div>
              <div>
                <p>
                  Forma płatności:
                  <span>{orderDetails?.paymentMethod}</span>
                </p>
              </div>
              <div className={payStatusStyle}>
                <p>
                  Status płatności:
                  <span>
                    {!orderDetails?.paid ? 'Nieopłacone' : 'Opłacone'}
                  </span>
                </p>
              </div>
              {!orderDetails?.paid && (
                <div>
                  <Link to={`/platnosc/${orderDetails?._id}`}>
                    <button type="button">Dokończ płatność</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={classes.addressBox}>
            <h4>Dane dostawy:</h4>
            <div className={classes.addressBox__details}>
              <p>
                Imię: <span>{orderDetails?.name}</span>
              </p>
              <p>
                Nazwisko: <span>{orderDetails?.surname}</span>
              </p>
              <p>
                Nazwa firmy: <span>{orderDetails?.companyName}</span>
              </p>
              <p>
                Miasto: <span>{orderDetails?.city}</span>
              </p>
              <p>
                Ulica: <span>{orderDetails?.street}</span>
              </p>
              <p>
                Kod pocztowy: <span>{orderDetails?.zipCode}</span>
              </p>
              <p>
                Telefon: <span>{orderDetails?.phone}</span>
              </p>
              <p>
                Adres email: <span>{orderDetails?.email}</span>
              </p>
              <p>
                Wiaodmość: <span>{orderDetails?.message}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <section>{content}</section>;
};

export default OrderDetailPage;
