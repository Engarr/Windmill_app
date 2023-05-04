import React from 'react';
import Input from '../UI/Input/Input';
import classes from './ProductForm.module.scss';
import { categories } from '../../util/data';

const ProductForm = () => {

  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.productForm__wrapper}>
      <form
        className={classes[`productForm__wrapper--form`]}
        onSubmit={onSubmit}
      >
        <h2>Dodaj nowy produkt:</h2>
        <Input type="text" text="Nazwa produktu:" data="name" />
        <Input type="number" text="Cena:" data="price" />
        <div className={`${classes.select} `}>
          <select name="category">
            <option disabled>Wybierz kategorię:</option>
            {categories
              .filter((category, index) => index !== 0)
              .map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className={`${classes.textareaBox} `}>
          <textarea
            className={classes.textarea}
            id="description"
            name="description"
            placeholder="Opis produktu:"
          />
          <label className={classes.label} htmlFor="description">
            Opis produktu:
          </label>
        </div>
        <div>
          <button>Zapisz produkt</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
