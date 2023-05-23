import React from 'react';
import { Link, useSubmit } from 'react-router-dom';
import classes from './ProductManage.module.scss';

const ProductManage = () => {
  const submit = useSubmit();

  function startDeleteHandler() {
    // eslint-disable-next-line no-alert
    const proceed = window.confirm('Czy na pewno chce uszunąć produkt?');
    if (proceed) {
      submit(null, { method: 'DELETE' });
    }
  }
  return (
    <div>
      <div className={classes.productManage}>
        <div>
          <h2>Zarządzaj produktem:</h2>
        </div>
        <div className={classes.productManage__buttonBox}>
          <div>
            <Link to="edit">
              <button type="button">Edytuj produkt</button>
            </Link>
          </div>
          <div>
            <button type="button" onClick={startDeleteHandler}>
              Usuń produkt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManage;
