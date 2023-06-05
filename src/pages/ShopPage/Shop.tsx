import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Products } from '../../types/types';
import Product from '../../components/Product/Product';
import classes from './Shop.module.scss';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
} from '../../store/api/productsApiSlice';
import Empty from '../../components/Empty/Empty';

const Shop = () => {
  const params = useParams<{ category: string }>();
  const category = params.category || `Wszystkie produkty`;
  const [products, setProducts] = useState<Products[]>([]);

  // function for fetching all or category products
  const { data: allProductsArr, isLoading: isAllProductsLoading } =
    useGetAllProductsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const { data: categoryProductsArr, isLoading: isCategoryProductsLoading } =
    useGetCategoryProductQuery(category);

  useEffect(() => {
    if (!category || category === 'Wszystkie produkty') {
      if (!isAllProductsLoading) {
        setProducts(allProductsArr?.products ?? []);
      }
    } else if (!isCategoryProductsLoading) {
      setProducts(categoryProductsArr?.products ?? []);
    }
  }, [
    category,
    allProductsArr,
    categoryProductsArr,
    isAllProductsLoading,
    isCategoryProductsLoading,
  ]);
  let content;

  if (isAllProductsLoading || isCategoryProductsLoading) {
    content = <Spinner message="Wczytywanie produktów.." />;
  } else if (products.length > 0) {
    content = (
      <>
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </>
    );
  } else if (products.length === 0) {
    content = (
      <Empty message="Nie posiadamy produktów w tej kategorii" width={300} />
    );
  }

  return (
    <section id="sklep">
      <div className={classes.navigation}>
        <Link to="/">
          <p>Strona główna</p>
        </Link>
        <span>/</span>
        <p className={classes.navigation__active}>{category}</p>
      </div>
      <div className={classes.product__wrappper}>{content}</div>
    </section>
  );
};

export default Shop;
