import { useState } from 'react';
import { Form } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Input from '../../UI/Input/Input';
import classes from './AccountManage.module.scss';
import {
  usePostChangeUserPasswordMutation,
  usePostChangeUserEmailMutation,
} from '../../../store/api/userApiSlice';
import { Data, ErrorsData } from '../../../types/types';
import LineWaveLoader from '../../Spinner/CircleWave/LineWaveLoader';

interface ResposneDataType {
  error?: {
    status: number;
    data: {
      errors: Data[];
      message?: string;
    };
  };

  data?: { message: string };
}
interface PropsType {
  token: string;
}
const AccountManage = ({ token }: PropsType) => {
  const [changePassword, { isLoading: changePasswordLoading }] =
    usePostChangeUserPasswordMutation();
  const [changeEmail, { isLoading: changeEmailLoading }] =
    usePostChangeUserEmailMutation();
  const [passwordbackendErrors, setPasswordBackendErrors] =
    useState<ErrorsData>({});
  const [emailbackendErrors, setEmailBackendErrors] = useState<ErrorsData>({});

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
    const { name, value } = e.target;
    setNewPawsswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const newEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Password change function
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

      if (resData.error) {
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setPasswordBackendErrors(errorsObj);
      }

      if (resData.error?.data.message) {
        toast.error(resData.error.data.message);
      } else if (resData.data) {
        toast.success(resData.data.message);
        setPasswordBackendErrors({});
        setNewPawsswordData({
          oldPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        });
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak.');
    }
  };

  // Email change function
  const changeEmailHandler = async () => {
    try {
      const { password, newEmail } = newEmailData;
      const response = await changeEmail({
        password,
        newEmail,
        token,
      });
      const resData = response as ResposneDataType;

      if (resData.error) {
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setEmailBackendErrors(errorsObj);
      }
      if (resData.error?.data.message) {
        toast.error(resData.error.data.message);
      } else if (resData.data) {
        toast.success(resData.data.message);
        setPasswordBackendErrors({});
        setEmailBackendErrors({
          password: '',
          newEmail: '',
        });
      }
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
          {Object.values(passwordbackendErrors).some(
            (error) => error !== ''
          ) && (
            <div className={classes.errorsContainer}>
              <h3>Błąd autoryzacji:</h3>
              <ul>
                {Object.entries(passwordbackendErrors).map(([key, value]) => {
                  return value && <li key={key}>{value}</li>;
                })}
              </ul>
            </div>
          )}
          <form>
            <Input
              type="password"
              text="Stare hasło:"
              data="oldPassword"
              defaultValue={newPawsswordData.oldPassword}
              onChange={newPasswordHandler}
            />
            <Input
              type="password"
              text="Nowe hasło:"
              data="newPassword"
              defaultValue={newPawsswordData.newPassword}
              onChange={newPasswordHandler}
            />
            <Input
              type="password"
              text="Powtórz nowe hasło:"
              data="repeatNewPassword"
              defaultValue={newPawsswordData.repeatNewPassword}
              onChange={newPasswordHandler}
            />
            <button type="button" onClick={changePasswordHandler}>
              {changePasswordLoading ? <LineWaveLoader /> : 'Zapisz zmiany'}
            </button>
          </form>
        </div>
        <div className={classes.newEmailContainer}>
          <h5>Zmiana adresu email:</h5>
          {Object.values(emailbackendErrors).some((error) => error !== '') && (
            <div className={classes.errorsContainer}>
              <h3>Błąd autoryzacji:</h3>
              <ul>
                {Object.entries(emailbackendErrors).map(([key, value]) => {
                  return value && <li key={key}>{value}</li>;
                })}
              </ul>
            </div>
          )}
          <form>
            <Input
              type="password"
              text="Hasło:"
              data="password"
              defaultValue={newEmailData.password}
              onChange={newEmailHandler}
            />
            <Input
              type="text"
              text="Nowy adres Email:"
              data="newEmail"
              defaultValue={newEmailData.newEmail}
              onChange={newEmailHandler}
            />

            <button type="button" onClick={changeEmailHandler}>
              {changeEmailLoading ? <LineWaveLoader /> : 'Zapisz zmiany'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
