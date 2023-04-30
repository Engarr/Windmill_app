import { Outlet } from 'react-router-dom';
import classes from './Root.module.scss';
import NavBar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';

const RootLayout = () => {
  return (
    <div className={classes.background}>
      <NavBar />
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
