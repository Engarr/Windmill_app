import classes from './HomePage.module.scss';
import image from '../../assets/e83ec73c1c471036fd8e883920b02aae.png';

const HomePage = () => {
  return (
    <>
      <section className={classes.home} id="strona-glowna">
        <div className={classes.container}>
          <div className={classes.container__shadow}></div>
          <div className={classes.container__frame}>
            <img src={image} className={classes[`container__frame--img`]} />
            <p className={classes.container__text}>
              Jeśli szukasz produktów wysokiej jakośći to dobrze trafiłeś!
              Zapraszamy do zapoznania się z ofertą naszego młyna
            </p>
          </div>
        </div>
      </section>
      <section className={classes.offert} id="offert">
        Oferta
      </section>
    </>
  );
};

export default HomePage;
