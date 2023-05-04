import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import ProductForm from '../../components/AddProductForm/ProductForm';

const NewProduct = () => {
  const userData = useRouteLoaderData('account') as string;

  return <ProductForm />;
};

export default NewProduct;
