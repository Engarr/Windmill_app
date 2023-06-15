import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { GiFlour } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';
import { BsSearch } from 'react-icons/bs';
import { FaEnvelope, FaFacebookF, FaArrowUp } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import NavLinks from '../NavLinks/NavLinks';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store/store';
import logo from '../../assets/logo.png';
import Toast from '../Toast/Toast';
import classes from './NavBar.module.scss';
import SearchModal from '../SearchModal/SearchModal';
import { useGetCartProductsQuery } from '../../store/api/cartApiSlice';

const NavBar = () => {
  const token = useRouteLoaderData('root') as string;
  const dispatch = useDispatch();
  const [isClassAdded, setIsClassAdded] = useState(false);

  const [activeSection, setActiveSection] = useState('');

  const [animationCss, setanimationCss] = useState('');
  const [searchBoxAnimation, setSearchBoxAnimation] = useState('');
  let qty;
  const totalQuantity = useSelector(
    (state: RootState) => state.cartItems.totalQuantity
  );

  const { data: cartItems } = useGetCartProductsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  if (!token) {
    qty = totalQuantity;
  } else if (cartItems) {
    const totalSum = cartItems.prodArr.reduce((sum, { quantity }) => {
      return sum + quantity;
    }, 0);
    qty = totalSum;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClassAdded(true);
      setTimeout(() => {
        setIsClassAdded(false);
      }, 300);
    }, 400);
    return () => clearTimeout(timeout);
  }, [qty]);

  const scrollPosition = useSelector(
    (state: RootState) => state.ui.scrollPosition
  );
  const isMenuVisible = useSelector(
    (state: RootState) => state.ui.isMenuVisible
  );
  const isSearchBoxVisible = useSelector(
    (state: RootState) => state.ui.isSearchModalVisible
  );

  // Animation function for flyout menu
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

  // animation broadcast function for search
  const showSearchModalHandler = () => {
    if (isSearchBoxVisible) {
      setTimeout(() => {
        dispatch(uiActions.SearchModalVisibleHandler());
      }, 300);
    } else {
      dispatch(uiActions.SearchModalVisibleHandler());
    }
    setSearchBoxAnimation(
      isSearchBoxVisible ? classes.hideSearchBox : classes.showSearchBox
    );
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
  }, [dispatch, scrollPosition]);

  const styleLogoCss = scrollPosition > 0 ? classes.nav__top : '';
  const styleIconsCss = scrollPosition > 0 ? classes.nav__icons : '';
  const styleBoxCss = scrollPosition > 0 ? classes.nav__height : '';

  // the function scrollWithOffset is used to move the page position to the section selected by the user

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = 220;
    window.scrollTo({ top: yCoordinate - yOffset, behavior: 'smooth' });
  };
  const scrolToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  let qtyContent;
  if (qty && qty <= 0) {
    qtyContent = null;
  } else if (qty && qty > 0) {
    qtyContent = (
      <div
        className={`${classes['nav__box--icons-qty']} ${
          isClassAdded ? classes.shake : ''
        }`}
      >
        <span>{qty}</span>
      </div>
    );
  }

  return (
    <header className={classes.nav}>
      {scrollPosition > 200 && (
        <div
          className={classes.nav__arrowUp}
          onClick={scrolToTop}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              scrolToTop();
            }
          }}
          tabIndex={0}
          role="button"
        >
          <FaArrowUp />
        </div>
      )}

      <div className={`${classes.nav__box} ${styleBoxCss}`}>
        <div>
          <HashLink to="/#strona-glowna" scroll={(el) => scrollWithOffset(el)}>
            <img
              src={logo}
              className={`${classes['nav__box--logo']} ${styleLogoCss}`}
              alt="logo"
            />
          </HashLink>
        </div>

        <div className={`${classes['nav__box--icons']} ${styleIconsCss}`}>
          <div className={classes['nav__box--icons-account']}>
            <Link
              to={token ? '/konto' : '/konto?mode=login'}
              onClick={() => {
                scrolToTop();
                setActiveSection('');
              }}
            >
              <VscAccount />
            </Link>
          </div>

          <div className={classes['nav__box--icons-cart']}>
            <Link
              to="/koszyk"
              onClick={() => {
                scrolToTop();
                setActiveSection('');
              }}
            >
              <GiFlour />
            </Link>
            {qtyContent}
          </div>
          <div className={classes['nav__box--icons-search']}>
            <button
              type="button"
              onClick={() => {
                showSearchModalHandler();
                scrolToTop();
                setActiveSection('');
              }}
            >
              <BsSearch />
            </button>
          </div>
          <div className={classes['nav__box--icons-envelope']}>
            <HashLink to="/#kontakt" scroll={(el) => scrollWithOffset(el)}>
              <FaEnvelope />
            </HashLink>
          </div>
          <div className={classes['nav__box--icons-fb']}>
            <Link to="https://www.facebook.com/profile.php?id=100001584875603">
              <FaFacebookF />
            </Link>
          </div>

          <div
            className={classes['nav__box--icons-burger']}
            onClick={showMenuHandler}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                showMenuHandler();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <CiMenuBurger />
          </div>
        </div>
        <Toast />
      </div>
      <SearchModal
        showSearchModalHandler={showSearchModalHandler}
        isSearchBoxVisible={isSearchBoxVisible}
        searchBoxAnimation={searchBoxAnimation}
      />
      <NavLinks
        isMenuVisible={isMenuVisible}
        showMenuHandler={showMenuHandler}
        scrollWithOffset={scrollWithOffset}
        animationCss={animationCss}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
    </header>
  );
};

export default NavBar;
