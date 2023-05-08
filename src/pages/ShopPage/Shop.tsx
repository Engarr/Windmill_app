import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Products } from '../../types/types';
import Product from '../../components/Product/Product';
import classes from './Shop.module.scss';

const Shop = () => {
  const params = useParams();
  const category = params.category || `Wszystkie produkty`;

  const [products, setProducts] = useState<Products[]>([]);

  const fetchProducts = async () => {
    let url;
    if (!category || category === 'Wszystkie produkty') {
      url = 'http://localhost:8080/api/feed/products';
    } else {
      url = `http://localhost:8080/api/feed/products/${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const productsArr = data.products;

    setProducts(productsArr);
  };
  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <section id="sklep">
      <div className={classes.product__wrappper}>
        {!products ? (
          <h2>...</h2>
        ) : (
          <>
            {products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default Shop;
