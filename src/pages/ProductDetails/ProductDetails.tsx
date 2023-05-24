import { redirect, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { getAuthToken } from '../../util/auth';
import { useGetProductDetailQuery } from '../../store/api/productsApiSlice';
import { useGetUserIdQuery } from '../../store/api/userApiSlice';

interface UserIdType {
  userId?: string;
}

interface ParamsType {
  productId: string;
}

const ProductDetails = () => {
  const token = getAuthToken();
  const param = useParams();
  const { productId } = param;
  let userId = null;
  let content;

  const { data: userData, isLoading: loadingUserId } = useGetUserIdQuery(
    token as string
  );
  const { data: productDetails, isLoading: productDetailLoading } =
    useGetProductDetailQuery(productId as string);

  const userIdData: UserIdType = userData as UserIdType;

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

export async function action({
  params,
  request,
}: {
  request: Request;
  params: ParamsType;
}) {
  const { productId } = params;
  const token = getAuthToken();
  const response = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}feed/delete/${productId}`,
    {
      method: request.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Niestety nie mogliśmy usunąć produktu');
  }
  return redirect('/sklep');
}
