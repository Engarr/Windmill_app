import { Link, Form } from 'react-router-dom';

const UserProfil = () => {
  return (
    <div>
      <Link to="/konto/nowy-produkt">
        <button type="button">DODAJ PRODUKT</button>
      </Link>
      <Form action="/logout" method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
};

export default UserProfil;
