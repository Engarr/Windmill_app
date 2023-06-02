import { useState } from 'react';

import { Form, useRouteLoaderData } from 'react-router-dom';
import Input from '../../UI/Input/Input';
import classes from './AccountManage.module.scss';
import { usePostChangeUserPasswordMutation } from '../../../store/api/userApiSlice';
import { Data } from '../../../types/types';

interface ResposneDataType {
  error?: {
    status: number;
    data: {
      errors: Data[];
    };
  };
  data?: { message: string };
}

const AccountManage = () => {
  const token = useRouteLoaderData('root') as string;
  const [changePassword] = usePostChangeUserPasswordMutation();

  const [newPawsswordData, setNewPawsswordData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [newEmailData, setNewEmailData] = useState({
    password: '',
    newEmail: '',
  });
  const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPawsswordData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const newEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmailData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const changePasswordHandler = async () => {
    try {
      const { oldPassword, newPassword, repeatNewPassword } = newPawsswordData;
      const response = await changePassword({
        oldPassword,
        newPassword,
        repeatNewPassword,
        token,
      });
      const resData = response as ResposneDataType;
      console.log(resData);
    } catch (err) {
      throw new Error('Coś poszło nie tak.');
    }
  };

  return (
    <div className={classes.mainContainer}>
      <h4>Zarządzaj kontem:</h4>
      <div>
        <h5>Witaj w panelu zarządzania swoim kontem</h5>
        <p>jeśli chcesz się wylogować naciśnij poniższy przycisk</p>
        <Form action="/logout" method="post">
          <button className={classes.logoutButton} type="submit">
            Wyloguj się
          </button>
        </Form>
      </div>
      <div className={classes.acctionsConatiner}>
        <div className={classes.newPasswordContainer}>
          <h5>Zmiana hasła:</h5>
          <form>
            <Input
              type="password"
              text="Stare hasło:"
              data="oldPassword"
              onChange={newPasswordHandler}
            />
            <Input
              type="password"
              text="Nowe hasło:"
              data="newPassword"
              onChange={newPasswordHandler}
            />
            <Input
              type="password"
              text="Powtórz nowe hasło:"
              data="repeatNewPassword"
              onChange={newPasswordHandler}
            />
            <button type="button" onClick={changePasswordHandler}>
              Zapisz zmiany
            </button>
          </form>
        </div>
        <div className={classes.newEmailContainer}>
          <h5>Zmiana adresu email:</h5>
          <form>
            <Input
              type="text"
              text="Hasło:"
              data="password"
              onChange={newEmailHandler}
            />
            <Input
              type="text"
              text="Nowy adres Email:"
              data="new-Email"
              onChange={newEmailHandler}
            />

            <button type="submit">Zapisz zmiany</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
