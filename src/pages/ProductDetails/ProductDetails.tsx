import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { idLoader, getAuthToken } from '../../util/auth';


const ProductDetails = () => {
  const productDetail = useRouteLoaderData('product-detail') as {};

  return (
    <div>
      <Suspense fallback={<Spinner message="Ładowanie..." />}>
        <Await resolve={productDetail}>
          {(loadDetail) => <ProductDetail detail={loadDetail} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProductDetails;

const loadDetail = async (id: string): Promise<{}> => {
  const url = import.meta.env.VITE_REACT_APP_API_URL + `feed/product/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.productDetail;
  }
};

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const param = params;
  const productId = param.productId as string;

  return defer({
    productDetail: await loadDetail(productId),
    userId: await idLoader(),
  });
}

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
