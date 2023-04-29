import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import NavLinks from '../NavLinks/NavLinks';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

import { GiFlour } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookF, FaArrowUp } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import classes from './NavBar.module.scss';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store/index';

const NavBar = () => {
  const [animationCss, setanimationCss] = useState('');
  const scrollPosition = useSelector(
    (state: RootState) => state.ui.scrollPosition
  );
  const dispatch = useDispatch();
  const isMenuVisible = useSelector(
    (state: RootState) => state.ui.isMenuVisible
  );

  const showMenuHandler = () => {
    if (isMenuVisible) {
      setTimeout(() => {
        dispatch(uiActions.MenuHandler());
      }, 400);
    } else {
      dispatch(uiActions.MenuHandler());
    }
    setanimationCss(isMenuVisible ? classes.inactive : classes.active);
  };

  // The function handleScroll is used to change the styling of the navigation
  useEffect(() => {
    function handleScroll() {
      const position = window.pageYOffset;
      dispatch(uiActions.scrollPositionHandler(position));
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const styleLogoCss = scrollPosition > 0 ? classes.nav__top : '';
  const styleIconsCss = scrollPosition > 0 ? classes.nav__icons : '';
  const styleBoxCss = scrollPosition > 0 ? classes.nav__height : '';

  //the function scrollWithOffset is used to move the page position to the section selected by the user

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = 260;
    window.scrollTo({ top: yCoordinate - yOffset, behavior: 'smooth' });
  };
  const scrolToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <header className={classes.nav}>
        {scrollPosition > 200 && (
          <div className={classes.nav__arrowUp} onClick={scrolToTop}>
            <FaArrowUp />
          </div>
        )}

        <div className={`${classes.nav__box} ${styleBoxCss}`}>
          <div>
            <HashLink
              to="/#strona-glowna"
              scroll={(el) => scrollWithOffset(el)}
            >
              <img
                src={logo}
                className={`${classes['nav__box--logo']} ${styleLogoCss}`}
              />
            </HashLink>
          </div>

          <div className={`${classes['nav__box--icons']} ${styleIconsCss}`}>
            <Link to="/konto?mode=login">
              <div className={classes['nav__box--icons-account']}>
                <VscAccount />
              </div>
            </Link>

            <div className={classes['nav__box--icons-cart']}>
              <GiFlour />
            </div>
            <div className={classes['nav__box--icons-envelope']}>
              <FaEnvelope />
            </div>
            <div className={classes['nav__box--icons-fb']}>
              <FaFacebookF />
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
          isMenuVisible={isMenuVisible}
          showMenuHandler={showMenuHandler}
          scrollWithOffset={scrollWithOffset}
          animationCss={animationCss}
        />
      </header>
    </>
  );
};

export default NavBar;
