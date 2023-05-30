import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LineWaveLoader from '../Spinner/CircleWave/LineWaveLoader';
import Input from '../UI/Input/Input';
import classes from './ProductForm.module.scss';
import { categories } from '../../util/data';
import UploadFile from '../UI/UploadFile/UploadFile';
import {
  ErrorsData,
  ProductType,
  ProductFormResponseType,
} from '../../types/types';
import {
  useAddProductMutation,
  useEdditProductMutation,
  FormDataType,
} from '../../store/api/productsApiSlice';
import { getAuthToken } from '../../util/auth';

interface PropsType {
  detail?: {
    productDetail?: ProductType;
    userId?: string;
  };
  userIdNumber?: string;
}

const ProductForm = ({ detail, userIdNumber }: PropsType) => {
  const details = detail?.productDetail;
  const IdUser = detail?.userId || userIdNumber;
  const creatorId = details?.creator.toString();
  const navigate = useNavigate();
  const isAuth = creatorId ? IdUser?.toString() === creatorId.toString() : true;
  let buttonContent;
  const [selectedImage, setSelectedImage] = useState<string | null>(
    details?.imageUrl || null
  );
  const [productData, setProductData] = useState({
    name: details?.name || '',
    price: details?.price || '',
    category: details?.category || 'Wybierz kategorię',
    description: details?.description || '',
  });
  const [backendErrors, setBackendErrors] = useState<ErrorsData>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [onAddProduct, { isLoading: isLoadingAdd, isSuccess: addSuccess }] =
    useAddProductMutation();
  const [
    onEdditProduct,
    { isSuccess: edditSuccess, isLoading: isLoadingEddit },
  ] = useEdditProductMutation();

  // The function responsible for receiving and manage a photo file
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event);
    const selectedPhotoFile: File | undefined = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL: string = reader.result as string;
      setSelectedImage(dataURL);
    };
    if (selectedPhotoFile) {
      reader.readAsDataURL(selectedPhotoFile);
    }
  };

  // A function to manage the data provided by the user in the form
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

  // A function for sending data to backend for add new product or editing existing product
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile as File);
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('description', productData.description);
    formData.append('category', productData.category);
    formData.append('userId', IdUser as string);

    if (details?._id && details?.creator && details?.imageUrl) {
      formData.append('imageUrl', details.imageUrl);
      formData.append('productId', details?._id);
      formData.append('creatorId', details.creator.toString());
    }

    try {
      const token = getAuthToken() as string;
      let response: ProductFormResponseType;

      if (details) {
        const editResponse = await onEdditProduct({
          id: details._id,
          formData: formData as FormDataType,
          token,
        });
        response = editResponse as ProductFormResponseType;
      } else {
        const addResponse = await onAddProduct(formData as FormDataType);
        response = addResponse as ProductFormResponseType;
      }

      if (response.error) {
        const errorArray = response.error.data.errors;
        const errorsObj: { [key: string]: string } = {};
        errorArray.forEach((error) => {
          errorsObj[error.path] = error.msg;
        });
        setBackendErrors(errorsObj);
        window.scroll(0, 0);
      }
    } catch (err) {
      throw new Error(
        details
          ? 'Coś poszło nie tak, nie można edutować produktu'
          : 'Nie można utworzyć nowego produktu'
      );
    }
  };

  useEffect(() => {
    if (addSuccess || edditSuccess) {
      toast.success(
        addSuccess
          ? 'Pomyślnie dodano nowy produkt'
          : 'Pomyślnie edytowano produkt'
      );
      navigate('/sklep');
    }
  }, [addSuccess, edditSuccess, navigate]);

  if (isLoadingAdd || isLoadingEddit) {
    buttonContent = <LineWaveLoader />;
  } else {
    buttonContent = details ? 'Edytuj produkt' : 'Zapisz produkt';
  }
  // function responsible for redirecting unauthorized users
  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

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
          defaultValue={productData.price}
          onChange={productDataHandler}
        />
        <div className={`${classes.select} `}>
          <select
            name="category"
            onChange={productDataHandler}
            value={productData.category}
          >
            <option value={productData.category} disabled>
              {productData.category}
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
            id="description" // Dodany id
            name="description"
            placeholder="Opis produktu:"
            defaultValue={productData.description}
            onChange={productDataHandler}
          />
          <label className={classes.label} htmlFor="description">
            Opis produktu:
          </label>
        </div>
        <div>
          <button type="submit">{buttonContent}</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
