import { useSelector } from 'react-redux';
import image from '../../assets/e83ec73c1c471036fd8e883920b02aae.png';
import AboutUs from '../../components/AboutUs/AboutUs';
import { RootState } from '../../store/store';
import Contact from '../../components/Contact/Contact';
import classes from './HomePage.module.scss';

const HomePage = () => {
  const scrollPosition = useSelector(
    (state: RootState) => state.ui.scrollPosition
  );
  return (
    <>
      <section className={classes.home} id="strona-glowna">
        <div className={classes.container}>
          <div className={classes.container__shadow} />
          <div className={classes.container__frame}>
            <img
              src={image}
              alt="none"
              className={classes[`container__frame--img`]}
            />
            <p className={classes.container__text}>
              Jeśli szukasz produktów wysokiej jakośći to dobrze trafiłeś!
              Zapraszamy do zapoznania się z naszą ofertą
            </p>
          </div>
        </div>
      </section>
      <section className={classes.offert} id="O-nas">
        <AboutUs scrollPosition={scrollPosition} />
      </section>
      <section id="kontakt">
        <Contact />
      </section>
    </>
  );
};

export default HomePage;
