import { useState } from 'react';
import Input from '../UI/Input/Input';
import classes from './ProductForm.module.scss';
import { categories } from '../../util/data';
import { redirect, useRouteLoaderData } from 'react-router-dom';
import UploadFile from '../UI/UploadFile/UploadFile';
import { Data, ErrorsData } from '../../types/types';
import { ProductType } from '../../types/types';

const ProductForm = (props: { detail: { productDetail: ProductType } }) => {
  const details = props.detail.productDetail;

  // const userId = useRouteLoaderData('account') as string;
  const [selectedImage, setSelectedImage] = useState<string | null>(
    details.imageUrl || null
  );

  const [productData, setProductData] = useState({
    name: details?.name || '',
    price: details?.price || 0,
    category: details?.category || '',
    description: details?.description || '',
  });
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //The function responsible for receiving a photo file
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event);
    const selectedFile: File = event.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL: string = reader.result as string;
      setSelectedImage(dataURL);
    };
    reader.readAsDataURL(selectedFile);
  };

  const productDataHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    return e.target.value;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let url = 'feed/add-product';
    let typeOfMethod = 'POST';
    if (details) {
      url = `feed/editProduct/${details._id}`;
      typeOfMethod = 'PUT';
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile as File);
    formData.append('imageUrl', details.imageUrl);
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('description', productData.description);

    formData.append('category', productData.category);
    formData.append('productId', details._id);
    formData.append('userId', details.creator.toString());

    const response = await fetch(import.meta.env.VITE_REACT_APP_API_URL + url, {
      method: typeOfMethod,
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      const errorArray = data.errors as Data[];
      const errorsObj: { [key: string]: string } = {};
      errorArray.forEach((error) => {
        errorsObj[error.path] = error.msg;
      });
      setBackendErrors(errorsObj);
      window.scroll(0, 0);
    } else {
      redirect('/sklep');
    }
  };

  return (
    <div className={classes.productForm__wrapper}>
      <div>
        {Object.values(backendErrors).some((error) => error !== '') && (
          <div className={classes.errorsContainer}>
            <h3>Błąd formularza:</h3>
            <ul>
              {Object.entries(backendErrors).map(
                ([key, value]: [string, string]) => {
                  return value && <li key={key}>{`${value}`}</li>;
                }
              )}
            </ul>
          </div>
        )}
      </div>
      <form
        className={classes[`productForm__wrapper--form`]}
        onSubmit={onSubmit}
      >
        <h2> {details ? 'Edytuj' : 'Dodaj nowy'} produkt:</h2>
        <Input
          type="text"
          text="Nazwa produktu:"
          data="name"
          defaultValue={productData.name}
          onChange={productDataHandler}
        />
        <div className={classes[`productForm__wrapper--photo`]}>
          <UploadFile onChange={handleImageChange} imageSrcs={selectedImage} />
        </div>

        <Input
          type="number"
          text="Cena:"
          data="price"
          step={0.01}
          defaultValue={details.price ? details.price : ''}
          onChange={productDataHandler}
        />
        <div className={`${classes.select} `}>
          <select
            name="category"
            onChange={productDataHandler}
            value={details.category ? details.category : 'Wybierz kategorię'}
          >
            <option
              value={!details.category ? details.category : 'Wybierz kategorię'}
              disabled
            >
              Wybierz kategorię:
            </option>
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
            defaultValue={details.description ? details.description : ''}
            onChange={productDataHandler}
          />
          <label className={classes.label} htmlFor="description">
            Opis produktu:
          </label>
        </div>
        <div>
          <button>{details ? 'Edytuj' : 'Zapisz'} produkt</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
