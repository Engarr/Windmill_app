import React, { useState, useEffect } from 'react';
import classes from './NavLinks.module.scss';
import { NavLink } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';

const NavLinks = (props: {
  scrollPosition: number;
  isMenuVisible: boolean;
  showMenuHandler: () => void;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection(section.id);
      }
    });
  }; ///The function handleScroll is to highlight the active section on the page on which we are located

  return (
    /////<--bigDevices
    <>
      <div className={`${classes[`nav__links--big`]} `}>
        <ul>
          <li className={activeSection === 'home' ? classes.active : ''}>
            <a
              href="#home"
              onClick={(e) => {
                props.scrollToSection(e);
              }}
            >
              Strona główna
            </a>
          </li>
          <li>
            <NavLink to="">Sklep On-line</NavLink>
          </li>
          <li className={activeSection === 'offert' ? classes.active : ''}>
            <a
              href="#offert"
              onClick={(e) => {
                props.scrollToSection(e);
              }}
            >
              Oferta
            </a>
          </li>
          <li className={activeSection === 'contact' ? classes.active : ''}>
            <a href="#contact">Kontakt</a>
          </li>
        </ul>
      </div>
      {/* /////<--smallDevices */}
      {props.isMenuVisible && (
        <div className={classes[`nav__links--small`]}>
          <TfiClose
            className={classes[`nav__links--close`]}
            onClick={props.showMenuHandler}
          />
          <ul>
            <li>
              <NavLink to="/home">Strona główna</NavLink>
            </li>
            <li>
              <NavLink to="">Sklep On-line</NavLink>
            </li>
            <li>
              <NavLink to="">Oferta</NavLink>
            </li>
            <li>
              <NavLink to="">Kontakt</NavLink>
            </li>
            <div className={classes[`nav__links--box`]}>
              <li>
                <NavLink to="">
                  <FaEnvelope />
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  <FaFacebookF />
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavLinks;
