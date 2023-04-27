// import './App.css';

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/HomePage';
import Shop from './pages/ShopPage/Shop';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/sklep', element: <Shop /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
