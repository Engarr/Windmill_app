import Input from '../../components/UI/Input/Input';
import classes from './ResetPage.module.scss';

const ResetPage = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainContainer__textBox}>
        <h2>Zapomniałeś/laś hasło?</h2>
        <p>Proszę wprowadzić nazwę użytkownika lub adres e-mail.</p>
        <p>
          Wyślemy w wiadomości email, kod potrzebny do utworzenia nowego hasła.
        </p>
      </div>
      <div className={classes.mainContainer__inputBox}>
        <Input type="text" text="Podaj swój adres e-mail" data="email" />
        <button type="button">Wyślij</button>
      </div>
    </div>
  );
};

export default ResetPage;
