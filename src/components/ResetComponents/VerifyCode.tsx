import { useState } from 'react';
import classes from '../../pages/ResetPasswordPage/ResetPage.module.scss';
import { usePutVerifyCodeMutation } from '../../store/api/userApiSlice';
import { ResetPasswordResponseType, ErrorsData } from '../../types/types';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';

interface PropsType {
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const VerifyCode = ({ setMode, setUserId }: PropsType) => {
  const [code, setCode] = useState<string>('');
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const inputCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const [onSendCode, { isLoading: isSendCodeLoading }] =
    usePutVerifyCodeMutation();
  const verifyCodeHandler = async () => {
    try {
      const response = await onSendCode({ code });

      const resData = response as ResetPasswordResponseType;

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
        setUserId(resData.data.userId);
        setMode('resetPassword');
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak, spróbuj ponownie później');
    }
  };
  return (
    <div>
      <div className={classes.mainContainer__textBox}>
        <h2>Wprowadź kod weryfikacyjny:</h2>
        <p>
          Na Twój adres email został wysłany kod potrzebny do zresetowania
          hasła.
        </p>
        <p>Wprowadź go poniżej w celu weryfikacji</p>
      </div>
      <div className={classes.mainContainer__CodeInputBox}>
        <input value={code} onChange={inputCodeHandler} />
        {backendErrors.code && <p>{backendErrors.code}</p>}
        <button type="button" onClick={verifyCodeHandler}>
          {isSendCodeLoading ? <LineWaveLoader /> : '   Wyślij'}
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
