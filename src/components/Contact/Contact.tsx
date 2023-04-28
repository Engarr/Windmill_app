import classes from './Contact.module.scss';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';

const Contact = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.contact__container}>
        <div className={classes.contact__textBox}>
          <h2>Masz pytania odnośnie produktów bądź współpracy?</h2>
          <h4>Zapraszamy do kontaktu!</h4>
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
      <div>
        <h2>Masz pytania odnośnie produktów bądź współpracy?</h2>
        <h4>Zapraszamy do kontaktu!</h4>
      </div>
    </div>
  );
};

export default Contact;
