import { AiOutlineClose } from 'react-icons/ai';
import Modal from '../Modal/Modal';
import classes from './SearchModal.module.scss';

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
  return (
    <div>
      {isSearchBoxVisible && (
        <>
          <Modal show={isSearchBoxVisible} handler={showSearchModalHandler} />
          <div className={`${classes.searchContainer} ${searchBoxAnimation}`}>
            <div className={classes.searchContainer__searchBox}>
              <input name="search" placeholder="Szukaj..." />

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
          </div>
        </>
      )}
    </div>
  );
};

export default SearchModal;
