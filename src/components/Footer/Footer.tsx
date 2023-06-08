import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = 220;
    window.scrollTo({ top: yCoordinate - yOffset, behavior: 'smooth' });
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.container__yearBox}>
          <p>&#169; {year} Polski-Młyn</p>
          <Link
            to="/polityka"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            Polityka prywatności
          </Link>
          <Link
            to="/regulamin"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            Regulamin
          </Link>
        </div>
        <div className={classes.container__iconsBox}>
          <div className={classes[`container__iconsBox--icon`]}>
            <HashLink to="/#kontakt" scroll={(el) => scrollWithOffset(el)}>
              <FaEnvelope />
            </HashLink>
          </div>
          <div className={classes[`container__iconsBox--icon`]}>
            <Link to="https://www.facebook.com/profile.php?id=100001584875603">
              <FaFacebookF />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
