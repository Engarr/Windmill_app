import { useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './Tabs.module.scss';
import AccountManage from './AccountManage/AccountManage';
import ProductsManage from './ProductsManage/ProductsManage';

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const token = useRouteLoaderData('root') as string;

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
          <button
            className={
              toggleState === 3
                ? `${classes.activeTab} ${classes.button}`
                : classes.button
            }
            onClick={() => toggleTab(2)}
            type="button"
          >
            Zamówienia
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
            <AccountManage token={token} />
          </div>
          <div
            className={
              toggleState === 2
                ? `${classes.content}  ${classes.activeContent}`
                : classes.content
            }
          >
            <ProductsManage token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
