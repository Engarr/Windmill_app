import { useRouteLoaderData, Link, redirect } from 'react-router-dom';
import ProductForm from '../AddProductForm/ProductForm';

const UserProfil = () => {
  const token = useRouteLoaderData('root') as string;
  // if (!token) {
  //   return redirect('/');
  // }

  return (
    <div>
      <Link to="/konto/nowy-produkt">
        <button>DODAJ PRODUKT</button>
      </Link>
    </div>
  );
};

export default UserProfil;
