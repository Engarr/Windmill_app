import React from 'react';
import ProductForm from '../../components/AddProductForm/ProductForm';
import { useGetUserIdQuery } from '../../store/api/userApiSlice';
import { getAuthToken } from '../../util/auth';
import Spinner from '../../components/Spinner/Spinner/Spinner';

interface UserIdType {
  data: {
    userId: string;
  };
  isLoading: boolean;
}
const NewProduct = () => {
  const token = getAuthToken();
  const { data, isLoading } = useGetUserIdQuery<UserIdType>(token as string);
  let userId;
  let conetnt;
  if (isLoading) {
    conetnt = <Spinner message="Pobieranie informacji..." />;
  } else {
    userId = data.userId;
    conetnt = <ProductForm userIdNumber={userId} />;
  }

  return <div>{conetnt}</div>;
};

export default NewProduct;
