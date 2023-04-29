import React from 'react';
import {
  useSearchParams,
  Link,
  Form,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import classes from './AuthForm.module.scss';
import Input from '../UI/Input/Input';
const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';
  
  return (
    <div className={classes.wrapper}>
      <Form method="post" className={classes.form__container}>
        <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</h2>

        <Input type="text" data="email" text="E-mail:" />
        <Input type="password" data="password" text="Hasło:" />
        {!isLogin && (
          <Input type="password" data="repeat-password" text="Powtórz hasło:" />
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
