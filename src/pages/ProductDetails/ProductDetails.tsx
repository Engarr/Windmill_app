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

const ProductDetails = () => {
  const productDetail = useRouteLoaderData('product-detail');

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
    const productDetail = resData.productDetail;

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
  });
}
