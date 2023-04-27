import React, { useState, useEffect } from 'react';
import classes from './NavLinks.module.scss';
import { HashLink } from 'react-router-hash-link';
import { NavLink, Link } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import Modal from '../Modal/Modal';

const NavLinks = (props: {
  scrollPosition: number;
  isMenuVisible: boolean;
  showMenuHandler: () => void;
  animationCss: string;
  scrollWithOffset: (e: HTMLElement) => void;
}) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setActiveSection('');
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  ///The function handleScroll is to highlight the active section on the page on which we are located
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
  };
  const activeNavHandler = () => {
    setActiveSection('sklep');
  };

  return (
    /////<--bigDevices
    <>
      <div className={`${classes[`nav__links--big`]} `}>
        <ul>
          <li
            className={activeSection === 'strona-glowna' ? classes.active : ''}
          >
            <HashLink
              to="/#strona-glowna"
              scroll={(el) => props.scrollWithOffset(el)}
            >
              Strona główna
            </HashLink>
          </li>
          <li
            className={activeSection === 'sklep' ? classes.active : ''}
            id="nav"
          >
            <NavLink to="/sklep" onClick={activeNavHandler}>
              Sklep On-line
            </NavLink>
          </li>

          <li className={activeSection === 'O-nas' ? classes.active : ''}>
            <HashLink to="/#O-nas" scroll={(el) => props.scrollWithOffset(el)}>
              O nas
            </HashLink>
          </li>

          <li className={activeSection === 'contact' ? classes.active : ''}>
            <a href="#contact">Kontakt</a>
          </li>
        </ul>
      </div>
      {/* /////<--smallDevices */}
      {props.isMenuVisible && (
        <div>
          <Modal show={props.isMenuVisible} handler={props.showMenuHandler} />
          <div
            className={`${classes[`nav__links--small`]} ${props.animationCss}`}
          >
            <TfiClose
              className={classes[`nav__links--close`]}
              onClick={props.showMenuHandler}
            />
            <ul>
              <li>
                <HashLink
                  to="/#strona-glowna"
                  onClick={(e) => {
                    props.showMenuHandler();
                  }}
                  scroll={(el) => props.scrollWithOffset(el)}
                >
                  Strona główna
                </HashLink>
              </li>
              <li>
                <NavLink to="/sklep">Sklep On-line</NavLink>
              </li>
              <li>
                <HashLink
                  to="/#O-nas"
                  onClick={(e) => {
                    props.showMenuHandler();
                  }}
                  scroll={(el) => props.scrollWithOffset(el)}
                >
                  O nas
                </HashLink>
              </li>
              <li>
                <HashLink to="">Kontakt</HashLink>
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
        </div>
      )}
    </>
  );
};

export default NavLinks;
