import { useState, useEffect } from 'react';
import classes from './NavBar.module.scss';
import logo from '../../assets/logo.png';
import { GiFlour } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookF, FaHamburger } from 'react-icons/fa';

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const position = window.pageYOffset;
      setScrollPosition(position);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);
  const styleLogoCss = scrollPosition > 0 ? classes.nav__top : '';
  const styleIconsCss = scrollPosition > 0 ? classes.nav__icons : '';
  const styleBoxCss = scrollPosition > 0 ? classes.nav__height : '';

  return (
    <div className={classes.nav}>
      <div className={`${classes.nav__box} ${styleBoxCss}`}>
        <div>
          <img
            src={logo}
            className={`${classes['nav__box--logo']} ${styleLogoCss}`}
          />
        </div>

        <div className={`${classes['nav__box--icons']} ${styleIconsCss}`}>
          <div className={classes['nav__box--icons-envelope']}>
            <FaEnvelope />
          </div>
          <div className={classes['nav__box--icons-fb']}>
            <FaFacebookF />
          </div>
          <div className={classes['nav__box--icons-account']}>
            <VscAccount />
          </div>
          <div className={classes['nav__box--icons-cart']}>
            <GiFlour />
          </div>
          <div className={classes['nav__box--icons-burger']}>
            <FaHamburger />
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default NavBar;
