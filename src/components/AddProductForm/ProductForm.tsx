import react, { useState } from 'react';
import Input from '../UI/Input/Input';
import classes from './ProductForm.module.scss';
import { categories } from '../../util/data';
import { useRouteLoaderData } from 'react-router-dom';

const ProductForm = () => {
  const userId = useRouteLoaderData('account') as string;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile as File);
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('userId', userId);
    formData.append('category', productData.category);

    const response = await fetch(
      import.meta.env.VITE_REACT_APP_API_URL + 'feed/add-product',
      {
        method: 'POST',

        body: formData,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
    } else {
      console.log('ok');
      console.log(data);
    }
  };

  return (
    <div className={classes.productForm__wrapper}>
      <form
        className={classes[`productForm__wrapper--form`]}
        onSubmit={onSubmit}
      >
        <h2>Dodaj nowy produkt:</h2>
        <Input
          type="text"
          text="Nazwa produktu:"
          data="name"
          defaultValue=""
          onChange={productDataHandler}
        />
        <div>
          <label htmlFor="image">Select an image:</label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <img src={selectedImage} alt="Selected" width="200" height="200" />
          )}
        </div>
        <Input
          type="number"
          text="Cena:"
          data="price"
          defaultValue=""
          onChange={productDataHandler}
        />
        <div className={`${classes.select} `}>
          <select
            name="category"
            onChange={productDataHandler}
            defaultValue={
              productData ? productData.category : 'Wybierz kategorię'
            }
          >
            <option
              value={productData ? productData.category : 'Wybierz kategorię'}
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
            defaultValue=""
            onChange={productDataHandler}
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
