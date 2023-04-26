import classes from './HomePage.module.scss';


const HomePage = () => {
  return (
    <div>
      <section className={classes.home} id="strona-glowna">
        HomePage
      </section>
      <section className={classes.offert} id="offert">
        Oferta
      </section>
    </div>
  );
};

export default HomePage;
