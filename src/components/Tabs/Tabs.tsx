import { useState } from 'react';
import { Link, Form } from 'react-router-dom';
import classes from './Tabs.module.scss';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  return (
    <div className={classes.main__container}>
      <div className={classes.container}>
        <div className={classes.container__blocTtabs}>
          <button
            className={
              toggleState === 1
                ? `${classes.activeTab} ${classes.button}`
                : classes.button
            }
            onClick={() => toggleTab(1)}
            type="button"
          >
            Konto
          </button>
          <button
            className={
              toggleState === 2
                ? `${classes.activeTab} ${classes.button}`
                : classes.button
            }
            onClick={() => toggleTab(2)}
            type="button"
          >
            Asortyment
          </button>
        </div>

        <div className={classes.container__contentTabs}>
          <div
            className={
              toggleState === 1
                ? `${classes.content}  ${classes.activeContent}`
                : classes.content
            }
          >
            <h4>Zarządzaj kontem:</h4>
            <Form action="/logout" method="post">
              <button type="submit">Logout</button>
            </Form>
          </div>
          <div
            className={
              toggleState === 2
                ? `${classes.content}  ${classes.activeContent}`
                : classes.content
            }
          >
            <h4>Zarządzaj asortymentem:</h4>
            <Link to="/konto/nowy-produkt">
              <button type="button">DODAJ PRODUKT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
