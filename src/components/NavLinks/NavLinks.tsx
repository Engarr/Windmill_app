import React, { useEffect, SetStateAction } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import classes from './NavLinks.module.scss';

interface PropsType {
  isMenuVisible: boolean;
  showMenuHandler: () => void;
  animationCss: string;
  scrollWithOffset: (e: HTMLElement) => void;
  setActiveSection: React.Dispatch<SetStateAction<string>>;
  activeSection: string;
}

const NavLinks = ({
  isMenuVisible,
  showMenuHandler,
  animationCss,
  scrollWithOffset,
  setActiveSection,
  activeSection,
}: PropsType) => {
  // const [activeSection, setActiveSection] = useState('');

  /// The function handleScroll is to highlight the active section on the page on which we are located

  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const positionOfScroll = window.pageYOffset + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      const sectionHeight = section.clientHeight;

      if (
        positionOfScroll >= sectionTop &&
        positionOfScroll < sectionTop + sectionHeight
      ) {
        setActiveSection(section.id);
      }
    });
  };
  useEffect(() => {
    setActiveSection('');
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const activeNavHandler = () => {
    setActiveSection('sklep');
  };
  const scrollTop = () => {
    window.scroll(0, 0);
  };

  return (
    // bigDevices
    <>
      <div className={`${classes[`nav__links--big`]} `}>
        <ul>
          <li
            className={activeSection === 'strona-glowna' ? classes.active : ''}
          >
            <HashLink
              to="/#strona-glowna"
              scroll={(el) => scrollWithOffset(el)}
            >
              Strona główna
            </HashLink>
          </li>
          <li
            className={activeSection === 'sklep' ? classes.active : ''}
            id="nav"
          >
            <NavLink
              to="/sklep"
              onClick={() => {
                activeNavHandler();
                scrollTop();
              }}
            >
              Sklep On-line
            </NavLink>
          </li>

          <li className={activeSection === 'O-nas' ? classes.active : ''}>
            <HashLink to="/#O-nas" scroll={(el) => scrollWithOffset(el)}>
              O nas
            </HashLink>
          </li>

          <li className={activeSection === 'kontakt' ? classes.active : ''}>
            <HashLink to="/#kontakt" scroll={(el) => scrollWithOffset(el)}>
              Kontakt
            </HashLink>
          </li>
        </ul>
      </div>
      {/* smallDevices  */}
      {isMenuVisible && (
        <div>
          <Modal show={isMenuVisible} handler={showMenuHandler} />
          <div className={`${classes[`nav__links--small`]} ${animationCss}`}>
            <TfiClose
              className={classes[`nav__links--close`]}
              onClick={showMenuHandler}
            />
            <ul>
              <li>
                <HashLink
                  to="/#strona-glowna"
                  onClick={() => {
                    showMenuHandler();
                  }}
                  scroll={(el) => scrollWithOffset(el)}
                >
                  Strona główna
                </HashLink>
              </li>
              <li>
                <NavLink
                  to="/sklep"
                  onClick={() => {
                    showMenuHandler();
                    scrollTop();
                  }}
                >
                  Sklep On-line
                </NavLink>
              </li>
              <li>
                <HashLink
                  to="/#O-nas"
                  onClick={() => {
                    showMenuHandler();
                  }}
                  scroll={(el) => scrollWithOffset(el)}
                >
                  O nas
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#kontakt"
                  onClick={() => {
                    showMenuHandler();
                  }}
                >
                  Kontakt
                </HashLink>
              </li>
              <div className={classes[`nav__links--box`]}>
                <li>
                  <HashLink
                    onClick={showMenuHandler}
                    to="/#kontakt"
                    scroll={(el) => scrollWithOffset(el)}
                  >
                    <FaEnvelope />
                  </HashLink>
                </li>
                <li>
                  <NavLink
                    to="https://www.facebook.com/profile.php?id=100001584875603"
                    onClick={showMenuHandler}
                  >
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
