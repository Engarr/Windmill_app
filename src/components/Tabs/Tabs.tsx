import { useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Tabs.module.scss';
import AccountManage from './AccountManage/AccountManage';
import ProductsManage from './ProductsManage/ProductsManage';
import OrderManage from './OrdersManage/OrderManage';
import { uiActions } from '../../store/ui-slice';
import { RootState } from '../../store/store';
import WishlistManage from './WishlistManage/WishlistManage';

const Tabs = () => {
  const selectedToggle = useSelector(
    (state: RootState) => state.ui.toggleState
  );
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState<number>(selectedToggle);
  const token = useRouteLoaderData('root') as string;

  const toggleTab = (index: number) => {
    setToggleState(index);
    dispatch(uiActions.selectToggleState(index));
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
            onClick={() => toggleTab(3)}
            type="button"
          >
            Zamówienia
          </button>
          <button
            className={
              toggleState === 4
                ? `${classes.activeTab} ${classes.button}`
                : classes.button
            }
            onClick={() => toggleTab(4)}
            type="button"
          >
            Ulubione
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
          <div
            className={
              toggleState === 3
                ? `${classes.content}  ${classes.activeContent}`
                : classes.content
            }
          >
            <OrderManage token={token} />
          </div>
          <div
            className={
              toggleState === 4
                ? `${classes.content}  ${classes.activeContent}`
                : classes.content
            }
          >
            <WishlistManage token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
