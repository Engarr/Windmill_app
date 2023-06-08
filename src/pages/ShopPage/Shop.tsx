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

  const [sortCriteria, setSortCriteria] = useState('recommended');

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
    let sortedProducts = [...products];

    if (sortCriteria === 'recomended') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sortedProducts = products;
    } else if (sortCriteria === 'alphabetically, A-Z') {
      sortedProducts.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (sortCriteria === 'price ascending') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === 'price descending') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    content = (
      <>
        {sortedProducts.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </>
    );
  } else {
    content = (
      <Empty
        message="Nie posiadamy jeszcze produktów w tej kategorii"
        width={300}
      />
    );
  }

  return (
    <section id="sklep">
      <div className={classes.navigation}>
        <div className={classes.navigation__nav}>
          <Link to="/">
            <p>Strona główna</p>
          </Link>
          <span>/</span>
          <p className={classes[`navigation__nav--active`]}>{category}</p>
        </div>
        <div className={classes.navigation__sorting}>
          <label>Opcje sortowania:</label>
          <select
            name="sorting"
            id="sorting"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="recommended" className={classes.option}>
              Domyślne sortowanie
            </option>
            <option value="alphabetically, A-Z">Alfabetycznie, A-Z</option>
            <option value="alphabetically, Z-A">Alfabetycznie, Z-A</option>
            <option value="price ascending">Cena rosnąco </option>
            <option value="price descending">Cena malejąco</option>
          </select>
        </div>
      </div>
      <div className={classes.product__wrappper}>{content}</div>
    </section>
  );
};

export default Shop;
