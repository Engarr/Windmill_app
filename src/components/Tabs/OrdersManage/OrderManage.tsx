import React from 'react';
import { Link } from 'react-router-dom';
import { useGetOrdersDetailQuery } from '../../../store/api/userApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';
import EmptyCart from '../../Empty/EmptyCart';
import { OrderType } from '../../../types/types';
import Empty from '../../Empty/Empty';
import classes from './OrderManage.module.scss';

interface PropsType {
  token: string;
}

const OrderManage = ({ token }: PropsType) => {
  const { data, isLoading, isError } = useGetOrdersDetailQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  let ordersInfo;
  if (data) {
    ordersInfo = data as OrderType[];
  }

  let content;
  if (isLoading) {
    content = <Spinner message="Ładowanie..." />;
  } else if (ordersInfo && ordersInfo.length === 0) {
    content = <EmptyCart message="Nie masz żadnych zamówień" />;
  } else if (isError) {
    content = (
      <Empty
        message="Nie udało się pobrać informacji o zamówieniach. Spóbuj ponownie później.."
        width={400}
      />
    );
  } else if (ordersInfo) {
    content = (
      <div className={classes.wrapper}>
        <h2>Lista Twoich zakupów:</h2>
        <div className={classes.wrapper__ordersContainer}>
          {ordersInfo.map((order) => {
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toLocaleString('pl-PL', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const hours = orderDate.getHours().toString().padStart(2, '0');
            const minutes = orderDate.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            const productsTotal = order.products.reduce(
              (acc, product) => acc + product.quantity * product.price,
              0
            );
            const total = productsTotal + Number(order.deliveryMethod.price);
            return (
              <div key={order._id} className={classes.wrapper__orderContainer}>
                <div className={classes[`wrapper__orderContainer--date`]}>
                  <div>
                    <p>
                      Data zakupu:<span>{formattedDate},</span>
                      <span>{formattedTime}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Zamówienie nr: <span>{order._id}</span>
                    </p>
                  </div>
                </div>

                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className={classes[`wrapper__orderContainer--order`]}
                  >
                    <div
                      className={classes[`wrapper__orderContainer--nameBox`]}
                    >
                      <img
                        src={product.imageUrl}
                        width={100}
                        alt={product.name}
                      />
                      <div>
                        <Link to={`/produkt/${product._id}`}>
                          <p>{product.name}</p>
                        </Link>
                      </div>
                    </div>
                    <div className={classes[`wrapper__orderContainer--price`]}>
                      <p>
                        {product.quantity} x <span>{product.price} zł</span>
                      </p>

                      <p>{product.quantity * product.price} zł</p>
                    </div>
                  </div>
                ))}
                <div className={classes[`wrapper__orderContainer--sumBox`]}>
                  <p>
                    Razem z dostawą: <span>{total.toFixed(2)} zł</span>
                  </p>
                </div>
                <div className={classes[`wrapper__orderContainer--details`]}>
                  <Link to={`/zamowienie/${order._id}`}>
                    <p>Szczegóły zakupu</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default OrderManage;
