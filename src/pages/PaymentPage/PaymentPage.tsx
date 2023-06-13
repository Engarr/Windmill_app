import { useParams } from 'react-router-dom';
import classes from './PaymentPage.module.scss';

const PaymentPage = () => {
  const params = useParams();
  const orderId = params?.orderId;

  return (
    <div>
      <div>
        <p>Zamowienie nr: {orderId?.toUpperCase()}</p>
      </div>
      <div>
        <h2>Dziękujemy za zakupy</h2>
        <p>Prosimy o opłacenie zamówienia za pomocą wybranej metody</p>
      </div>
      <div>
        <h3>Metody płatności:</h3>
        <div>
          <h4>Przelew tradycyjny:</h4>
          <div>Dane przelewu</div>
        </div>
        <div>
          <h4>Szybki przelew:</h4>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
