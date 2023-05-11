import React from 'react';
import { Link, useSubmit } from 'react-router-dom';
import classes from './ProductManage.module.scss';

const ProductManage = () => {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Czy na pewno chce uszunąć produkt?');

    if (proceed) {
      submit(null, { method: 'DELETE' });
    }
  }
  return (
    <div>
      <div className={classes.productManage}>
        <div>
          <Link to="edit">
            <button>Edytuj produkt</button>
          </Link>
        </div>
        <div>
          <button onClick={startDeleteHandler}>Usuń produkt</button>
        </div>
      </div>
    </div>
  );
};

export default ProductManage;
