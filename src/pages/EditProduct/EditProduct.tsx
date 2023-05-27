import { useParams } from 'react-router-dom';
import ProductForm from '../../components/AddProductForm/ProductForm';
import Spinner from '../../components/Spinner/Spinner/Spinner';
import { useGetProductDetailQuery } from '../../store/api/productsApiSlice';
import { useGetUserIdQuery } from '../../store/api/userApiSlice';
import { ProductType } from '../../types/types';
import { getAuthToken } from '../../util/auth';

interface DataType {
  data: {
    productDetail: ProductType;
  };
  isLoading: boolean;
}
interface UserIdType {
  data: {
    userId: string;
  };
  isLoading: boolean;
}

const EditProduct = () => {
  const token = getAuthToken();
  const param = useParams();
  const { productId } = param;

  const { data: productDetails, isLoading: isLoadingDetails } =
    useGetProductDetailQuery<DataType>(productId as string);

  const { data, isLoading: isUserIdLoading } = useGetUserIdQuery<UserIdType>(
    token as string
  );

  let conetnt;
  if (isLoadingDetails && isUserIdLoading) {
    conetnt = <Spinner message="Pobieranie informacji..." />;
  } else if (productDetails && data) {
    const detail = {
      productDetail: productDetails.productDetail,
      userId: data.userId,
    };
    conetnt = <ProductForm detail={detail} />;
  }

  return <div>{conetnt}</div>;
};

export default EditProduct;
