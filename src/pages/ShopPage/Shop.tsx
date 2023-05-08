import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Products } from '../../types/types';
import Product from '../../components/Product/Product';
import classes from './Shop.module.scss';
import Spinner from '../../components/Spinner/Spinner';

const Shop = () => {
  const params = useParams();
  const category = params.category || `Wszystkie produkty`;

  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchProducts = async () => {
    setisLoading(true);
    let url;
    if (!category || category === 'Wszystkie produkty') {
      url = 'http://localhost:8080/api/feed/products';
    } else {
      url = `http://localhost:8080/api/feed/products/${category}`;
    }

    const response = await fetch(url);

    const data = await response.json();
    const productsArr = data.products;

    setisLoading(false);
    setProducts(productsArr);
  };
  useEffect(() => {
    setProducts([]);
    fetchProducts();
  }, [category]);

  return (
    <section id="sklep">
      <div className={classes.product__wrappper}>
        {isLoading ? (
          <Spinner message="Wczytywanie produktów.." />
        ) : products.length > 0 ? (
          <>
            {products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </>
        ) : (
          <div className={classes.empty}>
            <h2>Wystąpił błąd, spróbuj ponownie później</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
