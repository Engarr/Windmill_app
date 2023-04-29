import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/HomePage';
import Shop from './pages/ShopPage/Shop';
import MyAccount from './pages/MyAccount/MyAccount';
import { action as authAction } from './pages/MyAccount/MyAccount';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/sklep', element: <Shop /> },
        { path: '/konto', element: <MyAccount />, action: authAction },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
