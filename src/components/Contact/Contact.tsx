import classes from './Contact.module.scss';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import { HiLocationMarker, HiPhone, HiOutlineMail } from 'react-icons/hi';

const Contact = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.contact__container}>
        <div className={classes.contact__textBox}>
          <h2>Masz pytania odnośnie produktów bądź współpracy?</h2>
          <h4>Zapraszamy do kontaktu!</h4>

          <div className={classes.contact__adress}>
            <h2>Gdzie nasz znajdziesz?</h2>
            <div>
              <HiLocationMarker className={classes[`contact__adress--icon`]} />
              <p>ul. Młyńska 29</p>
            </div>
            <div>
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
            <div className={classes[`contact__formBox--inputsBox`]}>
              <Input type="text" data="name" text="Imię:" />
              <Input type="text" data="email" text="E-mail:" />
              <Textarea />
            </div>
            <button>Wyślij</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
