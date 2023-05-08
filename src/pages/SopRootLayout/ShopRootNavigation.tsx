import { Outlet } from 'react-router-dom';

import Category from '../../components/Category/Category';

const ShopRootNavigation = () => {
  return (
    <section id="sklep">
      <Category />
      <Outlet />
    </section>
  );
};

export default ShopRootNavigation;
