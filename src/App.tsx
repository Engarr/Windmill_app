import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/HomePage';
import Shop from './pages/ShopPage/Shop';
import MyAccount from './pages/MyAccount/MyAccount';
import Cart from './pages/Cart/Cart';
import { tokenLoader } from './util/auth.js';
import NewProduct from './pages/NewProduct/NewProduct';
import ShopRootNavigation from './pages/SopRootLayout/ShopRootNavigation';
import logout from './pages/Logout/Logout';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import EditProduct from './pages/EditProduct/EditProduct';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import OrderPage from './pages/OrderPage/OrderPage';
import Statute from './pages/Statute/Statute';
import Policy from './pages/Policy/Policy';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
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
          id: 'product-detail',
          children: [
            {
              index: true,
              element: <ProductDetails />,
            },
            { path: 'edit', element: <EditProduct /> },
          ],
        },
        {
          path: '/konto',
          id: 'account',

          children: [
            { index: true, element: <MyAccount /> },
            { path: 'nowy-produkt', element: <NewProduct /> },
          ],
        },
        { path: '/koszyk', element: <Cart /> },
        { path: '/zamowienie', element: <OrderPage /> },
        {
          path: '/logout',
          action: logout,
        },
        { path: '/regulamin', element: <Statute /> },
        { path: '/polityka', element: <Policy /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
