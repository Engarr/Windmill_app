import { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsHeartbreak } from 'react-icons/bs';
import { useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import classes from './WishListButton.module.scss';
import {
  useGetWishlistQuery,
  usePostAddToWishListMutation,
  useDeleteFromWishListMutation,
} from '../../store/api/userApiSlice';
import Spinner from '../Spinner/Spinner/Spinner';

interface PropsType {
  productId: string;
}
interface ResponseType {
  data: {
    message: string;
    isOnWishlist: boolean;
  };
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const WishlistButton = ({ productId }: PropsType) => {
  const token = useRouteLoaderData('root') as string;
  const [isActive, setIsActive] = useState(0);

  const [onAddToWhislist] = usePostAddToWishListMutation();
  const [onRemoveFromWhislist] = useDeleteFromWishListMutation<{
    message: string;
  }>();
  const { data, isSuccess, isLoading, isError } =
    useGetWishlistQuery<ResponseType>(
      { token, productId },
      { refetchOnMountOrArgChange: true }
    );

  // funkcja dodawania produktu do listyżyczeń
  const addToWishlistHandler = async () => {
    try {
      await onAddToWhislist({
        token,
        productId,
      });
    } catch (err) {
      toast.error('Wystąpił błąd podczas dodawania produktu do listy życzń.');
    }
  };
  // funkcja usuwania produktu do listyżyczeń
  const removeFromWhislistHandler = async () => {
    try {
      await onRemoveFromWhislist({
        token,
        productId,
      });
    } catch (err) {
      toast.error('Wystąpił błąd podczas usuwania produktu z listy życzń.');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsActive(0);
    }, 400);
  }, [isActive]);
  let content;
  if (isLoading) {
    content = <Spinner message="Ładowanie" />;
  } else if (isSuccess && !data.isOnWishlist) {
    content = (
      <>
        <p>Dodaj do ulubionych:</p>
        <AiFillHeart
          className={`${classes.wishlistBox__icon} ${
            isActive === 2 ? classes.add : ''
          }`}
          onClick={() => {
            addToWishlistHandler();
            setIsActive(1);
          }}
        />
      </>
    );
  } else if (isSuccess && data.isOnWishlist) {
    content = (
      <>
        <p>Usuń z ulubionych:</p>
        <AiFillHeart
          className={`${classes.wishlistBox__iconAdded} ${
            isActive === 1 ? classes.remove : ''
          }`}
          onClick={() => {
            removeFromWhislistHandler();
            setIsActive(2);
          }}
        />
      </>
    );
  } else if (!isError) {
    content = (
      <>
        <p>Ups.. coś poszło nie tak:</p>
        <BsHeartbreak
          className={classes.wishlistBox__borken}
          onClick={addToWishlistHandler}
        />
      </>
    );
  }
  return <div className={classes.wishlistBox}>{content}</div>;
};

export default WishlistButton;
