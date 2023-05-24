import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import classes from './ProductManage.module.scss';
import { useDeleteProductMutation } from '../../store/api/productsApiSlice';
import { getAuthToken } from '../../util/auth';

interface PropsType {
  productId: string;
}

const ProductManage = ({ productId }: PropsType) => {
  const [deleteProduct, { isError }] = useDeleteProductMutation();

  const token = getAuthToken();
  const id = productId;
  const navigate = useNavigate();

  const deleteProductHandler = async () => {
    // eslint-disable-next-line no-alert
    const proceed = window.confirm('Czy na pewno chcesz usunąć produkt?');
    if (proceed) {
      try {
        await deleteProduct({
          token: token as string,
          productId: id,
        });

        if (isError) {
          toast.error('Ups... coś poszło nie tak');
        } else {
          toast.success('Produkt został usunięty');
          navigate('/sklep');
        }
      } catch (error) {
        toast.error('Wystąpił błąd podczas usuwania produktu');
      }
    }
  };

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
            <button type="submit" onClick={deleteProductHandler}>
              Usuń produkt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManage;
