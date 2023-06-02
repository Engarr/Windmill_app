import { Link } from 'react-router-dom';

const ProductsManage = () => {
  return (
    <div>
      <h4>Zarządzaj asortymentem:</h4>
      <Link to="/konto/nowy-produkt">
        <button type="button">DODAJ PRODUKT</button>
      </Link>
    </div>
  );
};

export default ProductsManage;
