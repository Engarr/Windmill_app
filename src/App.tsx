import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/HomePage';
import Shop from './pages/ShopPage/Shop';
import MyAccount from './pages/MyAccount/MyAccount';
import Cart from './pages/Cart/Cart';
import { action as authAction } from './pages/MyAccount/MyAccount';
import { tokenLoader, idLoader } from './util/auth.js';
import NewProduct from './pages/NewProduct/NewProduct';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/sklep', element: <Shop /> },
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
