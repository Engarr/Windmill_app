import { Link } from 'react-router-dom';
import classes from './PaymentMethod.module.scss';
import { ErrorOrderPageType } from '../../types/types';

interface PropsType {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  status: boolean;
  paymentMethod: string;
  backendErrors: ErrorOrderPageType;
}

const PaymentMethod = ({
  setStatus,
  status,
  setPaymentMethod,
  paymentMethod,
  backendErrors,
}: PropsType) => {
  const handlePaymentOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };
  const handleStatus = () => {
    setStatus(!status);
  };
  return (
    <div className={classes.paymentMethod__container}>
      <h4>Metody płatności</h4>
      <div>
        <input
          id="Przelew bankowy"
          type="radio"
          name="Przelew bankowy"
          value="Przelew bankowy"
          checked={paymentMethod === 'Przelew bankowy'}
          onChange={handlePaymentOption}
        />
        <label htmlFor="Przelew bankowy">Przelew tradycyjny</label>
      </div>
      <div>
        <input
          id="PayU"
          type="radio"
          name="PayU"
          value="PayU"
          checked={paymentMethod === 'PayU'}
          onChange={handlePaymentOption}
        />
        <label htmlFor="PayU">Przelew PayU lub Przelewy24</label>
      </div>
      <p>
        Przy wyborze płatności przelewem bezpośrednim prosimy o wpłatę na nasze
        konto bankowe. Proszę użyć numeru zamówienia jako tytułu płatności.
        Twoje zamówienie zostanie zrealizowane po zaksięgowaniu wpłaty na naszym
        koncie.
      </p>
      <div className={classes[`paymentMethod__container--checkbox`]}>
        <input type="checkbox" checked={status} onChange={handleStatus} />
        <label>
          Przeczytałem/am i akceptuję{' '}
          <Link to="/regulamin">
            regulamin<span>*</span>
          </Link>
          {backendErrors.status && <p>{backendErrors.status}</p>}
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
