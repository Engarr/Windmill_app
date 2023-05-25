import { useEffect, useState } from 'react';
import { useSearchParams, Link, Form, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import classes from './AuthForm.module.scss';
import Input from '../UI/Input/Input';
import { ErrorsData, ResponseType } from '../../types/types';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';
import {
  usePostLoginUserMutation,
  usePutRegisterUserMutation,
} from '../../store/api/userApiSlice';

const AuthForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const mode = searchParams.get('mode') || 'login';
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [postLoginUser, { status: loginStatus }] = usePostLoginUserMutation();
  const [putRegisterUser, { status: registeStatus }] =
    usePutRegisterUserMutation();
  const isSubmitting = loginStatus === 'pending' || registeStatus === 'pending';

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserButton = async () => {
    try {
      const { email, password, repeatPassword } = userData;
      const response = isLogin
        ? await postLoginUser({ mode, email, password })
        : await putRegisterUser({ mode, email, password, repeatPassword });

      const resData = response as ResponseType;
      if (resData.error) {
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setBackendErrors(errorsObj);
      }

      if (resData.data) {
        const { token } = resData.data;
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        localStorage.setItem('expiration', expiration.toISOString());
        if (isLogin) {
          toast.success('Zostałeś pomyślnie zalogowany. Witaj ponownie!');
          navigate('/');
        } else {
          toast.success('Konto zostało utworzone. Możesz się teraz zalogować');
          navigate('/');
        }
      }
    } catch (err) {
      throw new Error(
        isLogin
          ? 'Nie można uwierzytelnić użytkownika'
          : 'Coś poszło nie tak, nie można utworzyć nowego konta'
      );
    }
  };

  useEffect(() => {
    setBackendErrors({
      email: '',
      password: '',
      repeatPassword: '',
    });
  }, [isLogin]);

  let buttonContent;
  if (isLogin) {
    if (isSubmitting) {
      buttonContent = <LineWaveLoader />;
    } else {
      buttonContent = 'Zaloguj się';
    }
  } else if (!isLogin) {
    if (isSubmitting) {
      buttonContent = <LineWaveLoader />;
    } else {
      buttonContent = 'Utwórz konto';
    }
  }

  return (
    <div className={classes.wrapper}>
      {Object.values(backendErrors).some((error) => error !== '') && (
        <div className={classes.errorsContainer}>
          <h3>Błąd autoryzacji:</h3>
          <ul>
            {Object.entries(backendErrors).map(([key, value]) => {
              return value && <li key={key}>{value}</li>;
            })}
          </ul>
        </div>
      )}
      <Form method="post" className={classes.form__container}>
        <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</h2>

        <Input
          type="text"
          data="email"
          text="E-mail:"
          onChange={handleUserDataChange}
        />
        <Input
          type="password"
          data="password"
          text="Hasło:"
          onChange={handleUserDataChange}
        />
        {!isLogin && (
          <Input
            type="password"
            data="repeatPassword"
            text="Powtórz hasło:"
            onChange={handleUserDataChange}
          />
        )}
        <div className={classes.form__actions}>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleUserButton}
          >
            {buttonContent}
          </button>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Załóż konto nowe konto' : 'Zaloguj się'}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
