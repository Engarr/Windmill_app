import { useEffect } from 'react';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import classes from './DeliveryForm.module.scss';
import { ErrorOrderPageType } from '../../types/types';

export interface OrdeDataType {
  name: string;
  surname: string;
  companyName: string;
  city: string;
  street: string;
  zipCode: string;
  phone: string;
  email: string;
  message: string;
}

interface PropsType {
  setOrderData: React.Dispatch<React.SetStateAction<OrdeDataType>>;
  orderData: OrdeDataType;
  backendErrors: ErrorOrderPageType;
  setBackendErrors: React.Dispatch<React.SetStateAction<ErrorOrderPageType>>;
}

const DeliveryForm = ({
  setOrderData,
  orderData,
  backendErrors,
  setBackendErrors,
}: PropsType) => {
  const inputDataHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (orderData.name !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        name: '',
      }));
    }
    if (orderData.surname !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        surname: '',
      }));
    }
    if (orderData.city !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        city: '',
      }));
    }
    if (orderData.street !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        street: '',
      }));
    }
    if (orderData.zipCode !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        zipCode: '',
      }));
    }
    if (orderData.phone !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        phone: '',
      }));
    }
    if (orderData.email !== '') {
      setBackendErrors((prevData) => ({
        ...prevData,
        email: '',
      }));
    }
  }, [orderData, setBackendErrors]);

  return (
    <div className={classes.mainContainer}>
      <h2>Dane płatności</h2>
      <form className={classes.formBox}>
        <div>
          <Input
            type="text"
            data="name"
            text="Imię:"
            onChange={inputDataHandler}
            defaultValue={orderData.name}
            error={backendErrors.name}
          />

          <Input
            type="text"
            data="surname"
            text="Nazwisko:"
            onChange={inputDataHandler}
            defaultValue={orderData.surname}
            error={backendErrors.surname}
          />
        </div>
        <Input
          type="text"
          data="companyName"
          text="Nazwa firmy(opcjonalnie):"
          onChange={inputDataHandler}
          defaultValue={backendErrors.companyName}
        />
        <Input
          type="text"
          data="city"
          text="Miasto:"
          onChange={inputDataHandler}
          defaultValue={orderData.city}
          error={backendErrors.city}
        />
        <Input
          type="text"
          data="street"
          text="Ulica oraz numer domu:"
          onChange={inputDataHandler}
          defaultValue={orderData.street}
          error={backendErrors.street}
        />
        <Input
          type="number"
          data="zipCode"
          text="Kod pocztowy:"
          onChange={inputDataHandler}
          defaultValue={orderData.zipCode}
          error={backendErrors.zipCode}
        />
        <Input
          type="number"
          data="phone"
          text="Telefon:"
          onChange={inputDataHandler}
          defaultValue={orderData.phone}
          error={backendErrors.phone}
        />
        <Input
          type="text"
          data="email"
          text="Adres email:"
          onChange={inputDataHandler}
          defaultValue={orderData.email}
          error={backendErrors.email}
        />
        <Textarea
          text="Uwagi do zamówienia(opcjonalnie)"
          onChange={inputDataHandler}
          defaultValue={orderData.message}
        />
      </form>
    </div>
  );
};

export default DeliveryForm;
