import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import classes from './AuthForm.module.scss';
import Input from '../UI/Input/Input';

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <div className={classes.wrapper}>
      <form className={classes.form__container}>
        <h2>{isLogin ? 'Zaloguj się' : 'Zarejestruj się'}</h2>
        <Input type="text" data="email" text="E-mail:" />
        <Input type="password" data="password" text="Hasło:" />
        {!isLogin && (
          <Input type="password" data="repeat-password" text="Powtórz hasło:" />
        )}
        <div className={classes.form__actions}>
          <button>{isLogin ? 'Zaloguj się' : 'Utwórz konto'}</button>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Załóż konto nowe konto' : 'Zaloguj się'}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
