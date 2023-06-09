import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
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
  const [postLoginUser, { isLoading: isLoginLoading }] =
    usePostLoginUserMutation();
  const [putRegisterUser, { isLoading: isRegisterLoading }] =
    usePutRegisterUserMutation();

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
        if (resData.error.status === 500) {
          toast.error(resData.error.data.message);
          setUserData((prevData) => ({
            ...prevData,
            password: '',
          }));
        }
        window.scroll(0, 0);
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setBackendErrors(errorsObj);
      }

      if (resData.data) {
        if (isLogin) {
          const { token } = resData.data;
          localStorage.setItem('token', token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 24);
          localStorage.setItem('expiration', expiration.toISOString());
          toast.success('Zostałeś pomyślnie zalogowany. Witaj!');
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

  const sendDemoRequest = async () => {
    try {
      const response = await postLoginUser({
        mode: 'login',
        email: 'pocztademo@poczta.pl',
        password: 'haslodemo123Q!',
      });

      const resData = response as ResponseType;
      if (resData.data) {
        const { token } = resData.data;
        localStorage.setItem('token', token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 24);
        localStorage.setItem('expiration', expiration.toISOString());
        toast.success('Zostałeś pomyślnie zalogowany. Witaj!');
        navigate('/');
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak, spróbuj ponownie później');
    }
  };

  let buttonContent;
  if (isLogin) {
    if (isLoginLoading) {
      buttonContent = <LineWaveLoader />;
    } else {
      buttonContent = 'Zaloguj się';
    }
  } else if (!isLogin) {
    if (isRegisterLoading) {
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
      <form method="post" className={classes.form__container}>
        <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</h2>

        <Input
          type="text"
          data="email"
          text="E-mail:"
          onChange={handleUserDataChange}
          error={backendErrors.email}
          defaultValue={userData.email}
        />
        <Input
          type="password"
          data="password"
          text="Hasło:"
          defaultValue={userData.password}
          onChange={handleUserDataChange}
          error={backendErrors.password}
        />
        {!isLogin ? (
          <Input
            type="password"
            data="repeatPassword"
            text="Powtórz hasło:"
            onChange={handleUserDataChange}
            error={backendErrors.repeatPassword}
          />
        ) : (
          <div className={classes[`form__container--forgotPassword`]}>
            <Link to="/reset">Nie pamiętasz hasła?</Link>
          </div>
        )}
        <div className={classes.form__actions}>
          <button
            type="button"
            disabled={isRegisterLoading || isLoginLoading}
            onClick={handleUserButton}
          >
            {buttonContent}
          </button>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Załóż konto nowe konto' : 'Zaloguj się'}
          </Link>
        </div>
        {isLogin && (
          <div className={classes.demoButton}>
            <button type="button" onClick={sendDemoRequest}>
              Demo
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
