import { useState } from 'react';
import { toast } from 'react-hot-toast';
import classes from '../../pages/ResetPasswordPage/ResetPage.module.scss';
import Input from '../UI/Input/Input';
import { usePutResetSendEmailCodeMutation } from '../../store/api/userApiSlice';
import { FormResponseType, ErrorsData } from '../../types/types';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';

interface PropsType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const SendCode = ({ email, setEmail, setMode }: PropsType) => {
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const resetEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [onSendEmail, { isLoading: isSendEmailLoading }] =
    usePutResetSendEmailCodeMutation();
  const sendEmailHandler = async () => {
    try {
      const response = await onSendEmail({ email });

      const resData = response as FormResponseType;

      if (resData.error) {
        window.scroll(0, 0);
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setBackendErrors(errorsObj);
      } else {
        toast.success(resData.data.message);
        setMode('sendCode');
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak, spróbuj ponownie później');
    }
  };
  return (
    <div>
      <div className={classes.mainContainer__textBox}>
        <h2>Zapomniałeś/laś hasło?</h2>
        <p>Proszę wprowadzić nazwę użytkownika lub adres e-mail.</p>
        <p>
          Wyślemy w wiadomości email, kod potrzebny do utworzenia nowego hasła.
        </p>
      </div>
      <div className={classes.mainContainer__inputBox}>
        <Input
          type="text"
          text="Podaj swój adres e-mail"
          data="email"
          defaultValue={email}
          onChange={resetEmailHandler}
          error={backendErrors.email}
        />
        {backendErrors.email && <p>{backendErrors.email}</p>}
        <div>
          <button type="button" onClick={sendEmailHandler}>
            {isSendEmailLoading ? <LineWaveLoader /> : '   Wyślij'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendCode;
