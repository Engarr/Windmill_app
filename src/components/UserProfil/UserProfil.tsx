import { useRouteLoaderData, Link, redirect } from 'react-router-dom';
import ProductForm from '../AddProductForm/ProductForm';

const UserProfil = () => {
 

  return (
    <div>
      <Link to="/konto/nowy-produkt">
        <button>DODAJ PRODUKT</button>
      </Link>
    </div>
  );
};

export default UserProfil;
