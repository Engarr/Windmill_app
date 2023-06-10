import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import classes from '../../pages/ResetPasswordPage/ResetPage.module.scss';
import Input from '../UI/Input/Input';
import { ResetPasswordResponseType, ErrorsData } from '../../types/types';
import { usePutCreateNewPasswordMutation } from '../../store/api/userApiSlice';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';

interface PropsType {
  setNewPawsswordData: React.Dispatch<
    React.SetStateAction<{ newPassword: string; repeatNewPassword: string }>
  >;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  newPawsswordData: {
    newPassword: string;
    repeatNewPassword: string;
  };
  userId: string;
}

const AddNewPassword = ({
  setNewPawsswordData,
  setMode,
  newPawsswordData,
  userId,
}: PropsType) => {
  const navigate = useNavigate();
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const [onCreatePassword, { isLoading: isLoadingCreatePassword }] =
    usePutCreateNewPasswordMutation();
  const newPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPawsswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewPasswordHandler = async () => {
    try {
      const { newPassword, repeatNewPassword } = newPawsswordData;

      const response = await onCreatePassword({
        newPassword,
        repeatNewPassword,
        userId,
      });

      const resData = response as ResetPasswordResponseType;

      if (resData.error) {
        const errorsObj: { [key: string]: string } = {};
        if (resData.error.status === 422 || resData.error.status === 401) {
          resData.error.data.errors.forEach((error) => {
            errorsObj[error.path] = error.msg;
          });
        }
        setBackendErrors(errorsObj);
      } else {
        toast.success(resData.data.message);
        setMode('sendEmail');
        navigate('/konto');
      }
    } catch (err) {
      throw new Error('Coś poszło nie tak, spróbuj ponownie później');
    }
  };
  return (
    <div>
      <div className={classes.mainContainer__textBox}>
        <h2>Wprowadź nowe hasło:</h2>
      </div>
      <div className={classes.mainContainer__newPasswordBox}>
        <Input
          type="password"
          text="Nowe hasło:"
          data="newPassword"
          defaultValue={newPawsswordData.newPassword}
          onChange={newPasswordHandler}
          error={backendErrors.newPassword}
        />
        {backendErrors.newPassword && <p>{backendErrors.newPassword}</p>}
        <Input
          type="password"
          text="Powtórz nowe hasło:"
          data="repeatNewPassword"
          defaultValue={newPawsswordData.repeatNewPassword}
          onChange={newPasswordHandler}
          error={backendErrors.repeatPassword}
        />
        {backendErrors.repeatPassword && <p>{backendErrors.repeatPassword}</p>}
        <button type="button" onClick={createNewPasswordHandler}>
          {isLoadingCreatePassword ? <LineWaveLoader /> : 'Zmień hasło'}
        </button>
      </div>
    </div>
  );
};

export default AddNewPassword;
