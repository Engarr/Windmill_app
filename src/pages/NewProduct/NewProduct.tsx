import React from 'react';
import ProductForm from '../../components/AddProductForm/ProductForm';
import { useRouteLoaderData } from 'react-router-dom';

const NewProduct = () => {
  const userId = useRouteLoaderData('account') as string;
  

  return <ProductForm userId={userId} />;
};

export default NewProduct;
