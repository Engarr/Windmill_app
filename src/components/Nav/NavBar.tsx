import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import NavLinks from '../NavLinks/NavLinks';
import { GiFlour } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import classes from './NavBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store/index';

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const isMenuVisible = useSelector(
    (state: RootState) => state.ui.isMenuVisible
  );

  const showMenuHandler = () => {
    dispatch(uiActions.MenuHandler());
  };

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
  console.log(isMenuVisible);
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
            <CiMenuBurger onClick={showMenuHandler} />
          </div>
        </div>
      </div>

      <NavLinks
        scrollPosition={scrollPosition}
        isMenuVisible={isMenuVisible}
        showMenuHandler={showMenuHandler}
      />
    </div>
  );
};

export default NavBar;
