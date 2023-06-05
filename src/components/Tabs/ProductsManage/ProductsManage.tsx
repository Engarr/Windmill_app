import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill, BsSearch } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

import { toast } from 'react-hot-toast';
import {
  useGetUserProductQuery,
  useDeleteProductMutation,
} from '../../../store/api/productsApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';
import classes from './ProductsManage.module.scss';
import Input from '../../UI/Input/Input';
import { ProductType } from '../../../types/types';

interface PropsType {
  token: string;
}
const ProductsManage = ({ token }: PropsType) => {
  const { data: userProducts, isLoading } = useGetUserProductQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);

  const [deleteProduct, { isError }] = useDeleteProductMutation();
  let content;
  const searchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const deleteProductHandler = async (id: string) => {
    // eslint-disable-next-line no-alert
    const proceed = window.confirm('Czy na pewno chcesz usunąć produkt?');
    if (proceed) {
      try {
        await deleteProduct({
          token: token as string,
          productId: id,
        });

        if (isError) {
          toast.error('Ups... coś poszło nie tak');
        } else {
          toast.success('Produkt został usunięty');
        }
      } catch (error) {
        toast.error('Wystąpił błąd podczas usuwania produktu');
      }
    }
  };

  const searchProductsHanlder = () => {
    if (userProducts) {
      const filteredProducts = userProducts.products.filter((product) =>
        product.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );

      setSearchResults(filteredProducts);
    }
  };

  if (isLoading) {
    content = <Spinner message="Ładowanie produktów" />;
  } else if (userProducts?.products) {
    const productsToDisplay =
      searchResults.length > 0 ? searchResults : userProducts.products;

    if (productsToDisplay.length === 0) {
      content = <p>Brak wyników dla podanej frazy wyszukiwania.</p>;
    } else {
      content = (
        <>
          {productsToDisplay.map((product) => (
            <div key={product._id} className={classes.productsBox__product}>
              <div className={classes[`productsBox__product--name`]}>
                <img src={product.imageUrl} alt={product.name} width={100} />
                <p>{product.name}</p>
              </div>
              <div className={classes[`productsBox__product--buttons`]}>
                <div>
                  <Link to={`/produkt/${product._id}/edit`}>
                    <button
                      type="button"
                      className={classes[`productsBox__product--button`]}
                    >
                      <AiFillEdit />
                    </button>
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={() => {
                      deleteProductHandler(product._id);
                    }}
                    className={classes[`productsBox__product--button`]}
                  >
                    <BsFillTrashFill />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    }
  }
  return (
    <div className={classes.mainContainer}>
      <h4>Zarządzaj asortymentem:</h4>
      <div className={classes.newProductBox}>
        <h5>Dodaj nowy produkt za pomocą poniższego przycisku:</h5>
        <Link to="/konto/nowy-produkt">
          <button type="button">DODAJ PRODUKT</button>
        </Link>
      </div>
      <div className={classes.productsBox}>
        <h5>Twoje produkty:</h5>
        <div className={classes.productsBox__search}>
          <Input
            type="text"
            text="Szukaj..."
            data="search"
            onChange={searchValueHandler}
          />
          <button
            type="button"
            onClick={searchProductsHanlder}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                searchProductsHanlder();
              }
            }}
            tabIndex={0}
          >
            <BsSearch />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default ProductsManage;
