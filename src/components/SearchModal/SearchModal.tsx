import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import classes from './SearchModal.module.scss';
import Modal from '../Modal/Modal';
import { useGetSearchProductsQuery } from '../../store/api/productsApiSlice';
import Spinner from '../Spinner/Spinner/Spinner';
import errorImg from '../../assets/404.jpg';

interface PropsType {
  showSearchModalHandler: () => void;
  isSearchBoxVisible: boolean;
  searchBoxAnimation: string;
}

const SearchModal = ({
  showSearchModalHandler,
  isSearchBoxVisible,
  searchBoxAnimation,
}: PropsType) => {
  let content;
  const [searchValue, setSearchValue] = useState('');
  const searchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const { data, isLoading } = useGetSearchProductsQuery(
    searchValue !== '' && searchValue
  );

  if (isLoading) {
    content = <Spinner message="Wyszukiwanie produktów..." />;
  } else if (data) {
    if (data.length > 0) {
      content = (
        <div className={classes.contentContainer}>
          {data.map((product) => (
            <div
              key={product._id}
              className={classes.contentContainer__product}
            >
              <Link
                to={`/produkt/${product._id}`}
                onClick={() => {
                  showSearchModalHandler();
                  setSearchValue('');
                }}
              >
                <div>
                  <img src={product.imageUrl} width={100} alt={product.name} />
                </div>
                <div>
                  <p>{product.name} </p>
                </div>
                <div className={classes[`contentContainer__product--price`]}>
                  <p>{product.price} zł</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    } else if (searchValue !== '') {
      content = (
        <div className={classes.contentContainer}>
          <img src={errorImg} alt="Pusty worek" width={100} />
          <p>Niestety nie posiadamy takiego produktu</p>
        </div>
      );
    }
  }

  return (
    <div>
      {isSearchBoxVisible && (
        <>
          <Modal show={isSearchBoxVisible} handler={showSearchModalHandler} />
          <div className={`${classes.searchContainer} ${searchBoxAnimation}`}>
            <div className={classes.searchContainer__searchBox}>
              <input
                name="search"
                placeholder="Szukaj..."
                onChange={(e) => searchValueHandler(e)}
              />

              <div
                className={classes[`searchContainer__searchBox--close`]}
                role="button"
                onClick={showSearchModalHandler}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    showSearchModalHandler();
                  }
                }}
                tabIndex={0}
              >
                <AiOutlineClose
                  className={classes[`searchContainer__searchBox--close-icon`]}
                />
              </div>
            </div>
            {content}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchModal;
