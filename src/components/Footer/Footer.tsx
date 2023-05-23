import React from 'react';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.container__yearBox}>
          <p>&#169; {year} Polski-Młyn</p>
          <Link to="">Polityka prywatności</Link>
          <Link to="">Regulamin</Link>
        </div>
        <div className={classes.container__iconsBox}>
          <div className={classes[`container__iconsBox--icon`]}>
            <FaEnvelope />
          </div>
          <div className={classes[`container__iconsBox--icon`]}>
            <FaFacebookF />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
