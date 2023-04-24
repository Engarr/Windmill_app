import { Outlet } from 'react-router-dom';
import classes from './Root.module.scss';
import NavBar from '../../components/Nav/NavBar';
const RootLayout = () => {
  return (
    <div className={classes.background}>
      <NavBar />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
