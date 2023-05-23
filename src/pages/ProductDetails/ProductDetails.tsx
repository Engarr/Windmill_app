import { Suspense } from 'react';
import { useRouteLoaderData, redirect, defer, Await } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { idLoader, getAuthToken } from '../../util/auth';
import { ProductType } from '../../types/types';

interface ProductDetailType {
  productDetail: ProductType;
  userId: string;
}

interface ParamsType {
  productId: string;
}

const ProductDetails = () => {
  const productDetail = useRouteLoaderData(
    'product-detail'
  ) as ProductDetailType;

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

const loadDetail = async (id: string): Promise<ProductDetailType> => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}feed/product/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Nie udało się pobrać szczegółów wybranego produktu.');
  } else {
    const resData = await response.json();
    return resData.productDetail;
  }
};

export async function loader({ params }: { params: ParamsType }) {
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
