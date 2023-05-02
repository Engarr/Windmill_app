import { useEffect, useState } from 'react';
import {
  useSearchParams,
  Link,
  Form,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import classes from './AuthForm.module.scss';
import Input from '../UI/Input/Input';

type ErrorsData = {
  email?: string;
  password?: string;
  repeatPassword?: string;
};

type Data = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};

const AuthForm = () => {
  const navigation = useNavigation();
  const data = useActionData() as Data[];
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';
  const [backendErrors, setbackendErrors] = useState<ErrorsData>({});


  useEffect(() => {
    if (data) {
      const errorsObj: { [key: string]: string } = {};
      data.forEach((error) => {
        errorsObj[error.path] = error.msg;
      });

      setbackendErrors(errorsObj);
    }
  }, [data]);
  useEffect(() => {
    setbackendErrors({
      email: '',
      password: '',
      repeatPassword: '',
    });
   
  }, [isLogin]);

  return (
    <div className={classes.wrapper}>
      {Object.values(backendErrors).some((error) => error !== '') && (
        <div className={classes.errorsContainer}>
          <h3>Błąd autoryzacji:</h3>
          <ul>
            {backendErrors.email && <li>{backendErrors.email}</li>}
            {backendErrors.password && <li>{backendErrors.password}</li>}
            {backendErrors.repeatPassword && (
              <li>{backendErrors.repeatPassword}</li>
            )}
          </ul>
        </div>
      )}
      <Form method="post" className={classes.form__container}>
        <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</h2>

        <Input
          type="text"
          data="email"
          text="E-mail:"
         
        />
        <Input
          type="password"
          data="password"
          text="Hasło:"
          
        />
        {!isLogin && (
          <Input
            type="password"
            data="repeatPassword"
            text="Powtórz hasło:"
            
          />
        )}
        <div className={classes.form__actions}>
          <button type="submit" disabled={isSubmitting}>
            {isLogin
              ? isSubmitting
                ? '...'
                : 'Zaloguj się'
              : isSubmitting
              ? '...'
              : 'Utwórz konto'}
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
