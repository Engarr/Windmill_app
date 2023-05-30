import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { getAuthToken } from '../../util/auth';
import { useGetProductDetailQuery } from '../../store/api/productsApiSlice';
import { useGetUserIdQuery } from '../../store/api/userApiSlice';

interface UserIdType {
  userId?: string;
}

const ProductDetails = () => {
  const token = getAuthToken();
  const param = useParams();
  const { productId } = param;
  let userId;
  let content;

  // function for fetching userId information
  const { data: userData, isLoading: loadingUserId } = useGetUserIdQuery(
    token as string
  );
  const userIdData: UserIdType = userData as UserIdType;

  // function for fetching product details
  const { data: productDetails, isLoading: productDetailLoading } =
    useGetProductDetailQuery(productId as string, {
      refetchOnMountOrArgChange: true,
    });

  if (loadingUserId && productDetailLoading) {
    content = <Spinner message="Ładowanie..." />;
  } else if (!loadingUserId && !productDetailLoading) {
    userId = userIdData.userId;
    if (productDetails && userId) {
      content = <ProductDetail detail={productDetails} idUser={userId} />;
    }
  }

  return <div>{content}</div>;
};

export default ProductDetails;
