import classes from './NavLinks.module.scss';
import { Link } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { FaEnvelope, FaFacebookF } from 'react-icons/fa';

const NavLinks = (props: {
  scrollPosition: number;
  isMenu: boolean;
  showMenuHandler: () => void;
}) => {
    
  return (
    /////<--bigDevices
    <>
      <div className={classes[`nav__links--big`]}>
        <ul>
          <li>
            <Link to="">Strona główna</Link>
          </li>
          <li>
            <Link to="">Sklep On-line</Link>
          </li>
          <li>
            <Link to="">Oferta</Link>
          </li>
          <li>
            <Link to="">Kontakt</Link>
          </li>
        </ul>
      </div>
      {/* /////<--smallDevices */}
      {props.isMenu && (
        <div className={classes[`nav__links--small`]}>
          <TfiClose
            className={classes[`nav__links--close`]}
            onClick={props.showMenuHandler}
          />
          <ul>
            <li>
              <Link to="">Strona główna</Link>
            </li>
            <li>
              <Link to="">Sklep On-line</Link>
            </li>
            <li>
              <Link to="">Oferta</Link>
            </li>
            <li>
              <Link to="">Kontakt</Link>
            </li>
            <div className={classes[`nav__links--box`]}>
              <li>
                <Link to="">
                  <FaEnvelope />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaFacebookF />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavLinks;
