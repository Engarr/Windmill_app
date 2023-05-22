import { useRouteLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';
import ProductForm from '../../components/AddProductForm/ProductForm';
import Spinner from '../../components/Spinner/Spinner/Spinner';

const EditProduct = () => {
  const productDetail = useRouteLoaderData('product-detail');

  return (
    <div>
      <Suspense fallback={<Spinner message="Ładowanie..." />}>
        <Await resolve={productDetail}>
          {(loadDetail) => <ProductForm detail={loadDetail} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default EditProduct;
