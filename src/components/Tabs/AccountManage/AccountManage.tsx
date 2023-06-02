import { Form } from 'react-router-dom';
import Input from '../../UI/Input/Input';
import classes from './AccountManage.module.scss';

const AccountManage = () => {
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
            <Input type="text" text="Stare hasło:" data="old-password" />
            <Input type="text" text="Nowe hasło:" data="new-password" />
            <Input
              type="text"
              text="Powtórz nowe hasło:"
              data="repeat-new-password"
            />
            <button type="submit">Zapisz zmiany</button>
          </form>
        </div>
        <div className={classes.newEmailContainer}>
          <h5>Zmiana adresu email:</h5>
          <form>
            <Input type="text" text="Stare hasło:" data="old-password" />
            <Input type="text" text="Nowe hasło:" data="new-password" />
            <Input
              type="text"
              text="Powtórz nowe hasło:"
              data="repeat-new-password"
            />
            <button type="submit">Zapisz zmiany</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
