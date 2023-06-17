import { Link } from 'react-router-dom';
import { GiTwoCoins } from 'react-icons/gi';
import { AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import {
  useGetWishlistItemsQuery,
  useDeleteFromWishListMutation,
} from '../../../store/api/userApiSlice';
import classes from './WishlistManage.module.scss';
import Spinner from '../../Spinner/Spinner/Spinner';
import { ProductType } from '../../../types/types';
import Empty from '../../Empty/Empty';
import EmptyCart from '../../Empty/EmptyCart';

interface PropsType {
  token: string;
}
interface ResponseType {
  data: {
    productDetail: ProductType[];
  };
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const WishlistManage = ({ token }: PropsType) => {
  const {
    data: details,
    isLoading,
    isError,
  } = useGetWishlistItemsQuery<ResponseType>(token);

  let content;
  const [onRemoveFromWhislist] = useDeleteFromWishListMutation();
  const removeFromWhislistHandler = async (productId: string) => {
    try {
      await onRemoveFromWhislist({
        token,
        productId,
      });
    } catch (err) {
      toast.error('Wystąpił błąd podczas usuwania produktu z listy życzń.');
    }
  };
  if (isLoading) {
    content = <Spinner message="Ładowanie" />;
  } else if (details && details.productDetail.length > 0) {
    content = (
      <>
        <h2>Lista polibionych produktów:</h2>
        {details.productDetail.map((product) => (
          <div key={product._id} className={classes.wrapper}>
            <div className={classes.product__imageWrapper}>
              {!product.imageUrl ? (
                <Spinner message="" />
              ) : (
                <Link to={`/produkt/${product._id}`}>
                  <img src={product.imageUrl} alt={product.name} width={100} />
                </Link>
              )}
            </div>
            <div className={classes.product__infoWrapper}>
              <div className={classes[`product__infoWrapper--titleBox`]}>
                <div>
                  <h2>{product.name}</h2>
                </div>
                <div>
                  <p>Kategoria:</p>
                  <Link to={`/sklep/${product.category}`}>
                    {product.category}
                  </Link>
                </div>
                <div>
                  <p>
                    <GiTwoCoins
                      className={classes[`product__infoWrapper--icon`]}
                    />
                    {product.price} zł
                  </p>
                </div>
              </div>
              <div className={classes.wishlistBox}>
                <p>Usuń z ulubionych:</p>
                <AiFillHeart
                  className={classes.wishlistBox__iconAdded}
                  onClick={() => {
                    removeFromWhislistHandler(product._id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else if (details.productDetail && details.productDetail.length <= 0) {
    content = <EmptyCart message="Nie masz polubionych produktów" />;
  } else if (isError) {
    content = (
      <Empty
        message="Nie udało się pobrać informacji o liście ulubionych produktów. Spóbuj ponownie później.."
        width={400}
      />
    );
  }

  return <div className={classes.container}>{content}</div>;
};

export default WishlistManage;
