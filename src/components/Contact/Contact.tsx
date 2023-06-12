import { useState } from 'react';
import { HiLocationMarker, HiPhone, HiOutlineMail } from 'react-icons/hi';
import { BsFillSignpostSplitFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import classes from './Contact.module.scss';
import { usePutContactMessageMutation } from '../../store/api/userApiSlice';
import { FormResponseType, ErrorsData } from '../../types/types';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';

const Contact = () => {
  const [onContact, { isLoading, isError }] = usePutContactMessageMutation();
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({
    userName: '',
    email: '',
    message: '',
    subject: '',
  });
  const [contactData, setContactData] = useState({
    userName: '',
    email: '',
    message: '',
    subject: '',
  });

  const contacDataHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const contactHandler = async () => {
    try {
      const { userName, email, message, subject } = contactData;
      const response = await onContact({
        userName,
        email,
        message,
        subject,
      });
      const data = response as FormResponseType;

      if (!data.error) {
        toast.success(data.data.message);
        setContactData({
          userName: '',
          email: '',
          message: '',
          subject: '',
        });
      } else {
        const errorArray = data.error.data.errors;
        const errorsObj: { [key: string]: string } = {};
        errorArray.forEach((error) => {
          errorsObj[error.path] = error.msg;
        });
        setBackendErrors(errorsObj);
      }
      toast.error('Nieprawidłowo uzupełniony formularz');
    } catch (err) {
      throw new Error('Error: Nie udalo się wysłać wiaodmości');
    }
  };
  let buttonContent;
  if (isLoading) {
    buttonContent = <LineWaveLoader />;
  } else if (isError) {
    buttonContent = 'Popraw błędy formularza';
  } else {
    buttonContent = 'Wyślij';
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.contact__container}>
        <div className={classes.contact__textBox}>
          <h2>Masz pytania odnośnie produktów bądź współpracy?</h2>
          <h4>Zapraszamy do kontaktu!</h4>

          <div className={classes.contact__adress}>
            <h2>Gdzie nasz znajdziesz?</h2>
            <div>
              <BsFillSignpostSplitFill
                className={classes[`contact__adress--icon`]}
              />
              <p>ul. Młyńska 29</p>
            </div>
            <div>
              <HiLocationMarker className={classes[`contact__adress--icon`]} />
              <p> 37-716 Orły</p>
            </div>
            <div>
              <HiPhone className={classes[`contact__adress--icon`]} />
              <p>796-284-109</p>
            </div>
            <div>
              <HiOutlineMail className={classes[`contact__adress--icon`]} />
              <p>kontakt-mlyn@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={classes.contact__formBox}>
          <form>
            <div className={classes[`contact__formBox--h2Box`]}>
              <h2>Formularz kontaktowy</h2>
            </div>
            <div>
              {Object.values(backendErrors).some((error) => error !== '') && (
                <div className={classes.errorsContainer}>
                  <h3>Błąd formularza:</h3>
                  <ul>
                    {Object.entries(backendErrors).map(
                      ([key, value]: [string, string]) => {
                        return value && <li key={key}>{`${value}`}</li>;
                      }
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className={classes[`contact__formBox--inputsBox`]}>
              <Input
                type="text"
                data="subject"
                text="Tytuł wiadomości:"
                onChange={contacDataHandler}
                defaultValue={contactData.subject}
                error={backendErrors.subject}
              />
              <Input
                type="text"
                data="userName"
                text="Twoje imię:"
                onChange={contacDataHandler}
                defaultValue={contactData.userName}
                error={backendErrors.userName}
              />
              <Input
                type="text"
                data="email"
                text="Twój e-mail:"
                onChange={contacDataHandler}
                defaultValue={contactData.email}
                error={backendErrors.email}
              />
              <Textarea
                onChange={contacDataHandler}
                defaultValue={contactData.message}
                error={backendErrors.message}
                text="Twoja wiaodmość:"
              />
            </div>
            <button type="button" onClick={contactHandler}>
              {buttonContent}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
