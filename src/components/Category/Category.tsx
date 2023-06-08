import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { categories } from '../../util/data';
import classes from './Category.module.scss';
import { RootState } from '../../store/store';
import { uiActions } from '../../store/ui-slice';

const Category = () => {
  const param = useParams();
  const categoryParam = param.category || 'Wszystkie produkty';

  const [animationCss, setanimationCss] = useState('');
  const [animationCssArrow, setanimationCssArrow] = useState('');
  const dispatch = useDispatch();
  const isCategoryMenu = useSelector(
    (state: RootState) => state.ui.isCategoryMenu
  );
  const cateogryMenuHandler = () => {
    if (isCategoryMenu) {
      setTimeout(() => {
        dispatch(uiActions.CategoryMenuHandler());
      }, 400);
    } else {
      dispatch(uiActions.CategoryMenuHandler());
    }
    setanimationCss(isCategoryMenu ? classes.inactive : classes.active);

    setanimationCssArrow(isCategoryMenu ? classes.arrowUp : classes.arrowDown);
  };
  return (
    <>
      <div className={classes.category__desktop}>
        <ul className={classes.desktop}>
          {categories.map((category) => {
            return (
              <NavLink key={category.id} to={`${category.name}`}>
                <li
                  className={
                    category.name === categoryParam
                      ? classes.activeCategory
                      : ''
                  }
                >
                  {category.name}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
      <div className={classes.category__mobile}>
        <div
          className={classes[`category__mobile--menu`]}
          onClick={cateogryMenuHandler}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              cateogryMenuHandler();
            }
          }}
          tabIndex={0}
          role="button"
        >
          <p>Kategorie</p>
          <FaAngleDoubleDown className={animationCssArrow} />
        </div>
        <div
          className={`${
            classes[`category__mobile--categories`]
          } ${animationCss}`}
        >
          <ul>
            {categories?.map((category) => {
              return (
                <NavLink
                  key={category.id}
                  to={`${category.name}`}
                  onClick={cateogryMenuHandler}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      cateogryMenuHandler();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <li
                    className={
                      category.name === categoryParam
                        ? classes.activeCategory
                        : ''
                    }
                  >
                    {category.name}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
