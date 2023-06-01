import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './PaymentMethod.module.scss';

const PaymentMethod = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>('Przelew bankowy');

  const [status, setStatus] = useState(false);

  const handlePaymentOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
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
          checked={selectedOption === 'Przelew bankowy'}
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
          checked={selectedOption === 'PayU'}
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
      <div>
        <input type="checkbox" checked={status} onChange={handleStatus} />
        <label>
          Przeczytałem/am i akceptuję <Link to="/regulamin">regulamin</Link>
          <span>*</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
