import { Link } from 'react-router-dom';
import NavBar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';
import classes from './ErrorPage.module.scss';
import errorImg from '../../assets/404.jpg';

const ErrorPage = () => {
  return (
    <div className={classes.errorPage__container}>
      <NavBar />
      <div className={classes.errorPage__Box}>
        <p>Ups.. Coś poszło nie tak, spróbuj ponownie później... </p>
        <h2>
          Error <span>404 </span>
        </h2>
        <img src={errorImg} alt="empty bag" width={400} />
        <Link to="/">
          <button type="button">Wróć do strony głównej</button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
