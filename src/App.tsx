import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/HomePage';
import Shop from './pages/ShopPage/Shop';
import MyAccount from './pages/MyAccount/MyAccount';
import Cart from './pages/Cart/Cart';
import { action as authAction } from './pages/MyAccount/MyAccount';
import { tokenLoader, idLoader } from './util/auth.js';
import NewProduct from './pages/NewProduct/NewProduct';
import ShopRootNavigation from './pages/SopRootLayout/ShopRootNavigation';
import { action as logout } from './pages/Logout/Logout';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import {
  loader as productsDetailLoader,
  action as deleteProductAction,
} from './pages/ProductDetails/ProductDetails';
import EditProduct from './pages/EditProduct/EditProduct';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '*',
          element: <ErrorPage />,
        },
        { index: true, element: <HomePage /> },

        {
          path: '/sklep',
          element: <ShopRootNavigation />,

          children: [
            { index: true, element: <Shop /> },
            {
              path: ':category',
              element: <Shop />,
            },
          ],
        },
        {
          path: '/produkt/:productId',
          loader: productsDetailLoader,
          id: 'product-detail',
          children: [
            {
              index: true,
              element: <ProductDetails />,
              action: deleteProductAction,
            },
            { path: 'edit', element: <EditProduct /> },
          ],
        },
        {
          path: '/konto',
          id: 'account',
          loader: idLoader,
          children: [
            { index: true, element: <MyAccount />, action: authAction },
            { path: 'nowy-produkt', element: <NewProduct /> },
          ],
        },
        { path: '/koszyk', element: <Cart /> },
        {
          path: '/logout',
          action: logout,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
