import React from 'react';
import Input from '../UI/Input/Input';
import classes from './DeliveryForm.module.scss';

const DeliveryForm = () => {
  return (
    <div className={classes.mainContainer}>
      <h2>Dane płatności</h2>
      <form className={classes.formBox}>
        <div>
          <Input type="text" data="name" text="Imię:" />
          <Input type="text" data="surname" text="Nazwisko:" />
        </div>
        <Input type="text" data="street" text="Ulica oraz numer domu:" />
        <Input type="text" data="zip-code" text="Kod pocztowy:" />
        <Input type="text" data="phone" text="Telefon:" />
        <Input type="text" data="email" text="Adres email:" />
      </form>
    </div>
  );
};

export default DeliveryForm;
