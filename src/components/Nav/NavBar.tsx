import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import NavLinks from '../NavLinks/NavLinks';
import { GiFlour } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import classes from './NavBar.module.scss';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store/index';

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animationCss, setanimationCss] = useState('');
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

  //the function scrollToSection is used to move the page position to the section selected by the user
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const sectionId = e.currentTarget.getAttribute('href');
    const sectionElement = document.querySelector(sectionId!);
    console.log(sectionElement);

    if (sectionElement instanceof HTMLElement) {
      const sectionPosition = sectionElement.offsetTop;
      window.scrollTo({
        top: sectionPosition - 240,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className={classes.nav}>
        <div className={`${classes.nav__box} ${styleBoxCss}`}>
          <div>
            <a href="#home" onClick={(e) => scrollToSection(e)}>
              <img
                src={logo}
                className={`${classes['nav__box--logo']} ${styleLogoCss}`}
              />
            </a>
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
          isMenuVisible={isMenuVisible}
          showMenuHandler={showMenuHandler}
          scrollToSection={scrollToSection}
          animationCss={animationCss}
        />
      </div>
    </>
  );
};

export default NavBar;
