import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
  useParams,
} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { getAuthToken } from '../../util/auth';
import {
  useGetProductDetailsQuery,
  useGetUserIdQuery,
} from '../../store/apiSlice';

const ProductDetails = () => {
  const token = getAuthToken();
  const params = useParams();
  const productId = params.productId;

  const { data: productDetails, isLoading: loadingDetails } =
    useGetProductDetailsQuery(productId as string);
  if (!token) {
    return <Spinner message="Ładowanie..." />;
  }
  const { data: userId, isLoading: loadingUserId } = useGetUserIdQuery(token);

  return (
    <div>
      {loadingDetails && loadingUserId ? (
        <Spinner message="Ładowanie..." />
      ) : (
        <ProductDetail
          productDetails={productDetails?.productDetail}
          userId={userId?.userId as string}
        />
      )}
    </div>
  );
};

export default ProductDetails;

export async function action({
  params,
  request,
}: {
  request: Request;
  params: any;
}) {
  const productId = params.productId;
  const token = getAuthToken();
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_URL + `feed/delete/${productId}`,
    {
      method: request.method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw json(
      { message: 'Niestety nie mogliśmy usunąć produktu' },
      {
        status: 500,
      }
    );
  }
  return redirect('/sklep');
}
