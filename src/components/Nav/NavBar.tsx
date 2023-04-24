import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import NavLinks from '../NavLinks/NavLinks';
import { GiFlour } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import classes from './NavBar.module.scss';

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenu, setIsMenu] = useState(false);

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
  const showMenuHandler = () => {
    setIsMenu((prev) => (prev = !prev));
  };

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
          <div
            className={classes['nav__box--icons-burger']}
            onClick={showMenuHandler}
          >
            <CiMenuBurger />
          </div>
        </div>
      </div>

      <NavLinks
        scrollPosition={scrollPosition}
        isMenu={isMenu}
        showMenuHandler={showMenuHandler}
      />
    </div>
  );
};

export default NavBar;
