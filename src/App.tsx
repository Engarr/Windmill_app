// import './App.css';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './pages/Root/Root';
import HomePage from './pages/Home/HomePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [{ path: '/', element: <HomePage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
