import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import ProductForm from '../../components/AddProductForm/ProductForm';

const NewProduct = () => {
  const userId = useRouteLoaderData('account') as string;

  return <ProductForm userIdNumber={userId} />;
};

export default NewProduct;
