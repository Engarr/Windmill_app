import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Products } from '../../types/types';
import Product from '../../components/Product/Product';
import classes from './Shop.module.scss';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import {
  useGetAllProductsQuery,
  useGetCategoryProductQuery,
} from '../../store/apiSlice';
import errorImg from '../../assets/404.jpg';

const Shop = () => {
  const params = useParams<{ category: string }>();
  const category = params.category || `Wszystkie produkty`;
  const [products, setProducts] = useState<Products[]>([]);

  const { data: allProductsArr, isLoading: isAllProductsLoading } =
    useGetAllProductsQuery();
  const { data: categoryProductsArr, isLoading: isCategoryProductsLoading } =
    useGetCategoryProductQuery(category);

  useEffect(() => {
    if (!category || category === 'Wszystkie produkty') {
      if (!isAllProductsLoading) {
        setProducts(allProductsArr?.products ?? []);
      }
    } else {
      if (!isCategoryProductsLoading) {
        setProducts(categoryProductsArr?.products ?? []);
      }
    }
  }, [
    category,
    allProductsArr,
    categoryProductsArr,
    isAllProductsLoading,
    isCategoryProductsLoading,
  ]);

  return (
    <section id="sklep">
      <div className={classes.product__wrappper}>
        {isAllProductsLoading || isCategoryProductsLoading ? (
          <Spinner message="Wczytywanie produktów.." />
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
              </>
            ) : (
              <div className={classes.empty}>
                <p>Niestety nie psoiadamy produktu w takeij kategorii </p>

                <img src={errorImg} alt="empty bag" width={400} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Shop;
