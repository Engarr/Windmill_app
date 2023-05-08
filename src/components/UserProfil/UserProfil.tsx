import { useRouteLoaderData, Link, redirect, Form } from 'react-router-dom';
import ProductForm from '../AddProductForm/ProductForm';

const UserProfil = () => {
  return (
    <div>
      <Link to="/konto/nowy-produkt">
        <button>DODAJ PRODUKT</button>
      </Link>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
    </div>
  );
};

export default UserProfil;
