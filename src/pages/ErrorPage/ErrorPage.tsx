import NavBar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';
import classes from './ErrorPage.module.scss';
import errorImg from '../../assets/404.jpg';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div className={classes.errorPage__container}>
        {/* <NavBar /> */}
        <div className={classes.errorPage__Box}>
          <p>Niestety strona nie istnieje... </p>
          <h2>
            Error <span>404 </span>
          </h2>
          <img src={errorImg} alt="empty bag" width={400} />
          <Link to="/">
            <button>Wróć do strony głównej</button>
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ErrorPage;
