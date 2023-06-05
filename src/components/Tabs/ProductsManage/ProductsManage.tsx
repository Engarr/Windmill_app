import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import {
  useGetUserProductQuery,
  useDeleteProductMutation,
} from '../../../store/api/productsApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';
import classes from './ProductsManage.module.scss';

interface PropsType {
  token: string;
}
const ProductsManage = ({ token }: PropsType) => {
  const { data: userProducts, isLoading } = useGetUserProductQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteProduct, { isError }] = useDeleteProductMutation();
  let content;

  const deleteProductHandler = async (id: string) => {
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
        }
      } catch (error) {
        toast.error('Wystąpił błąd podczas usuwania produktu');
      }
    }
  };
  if (isLoading) {
    content = <Spinner message="Ładowanie produktów" />;
  } else if (userProducts?.products) {
    content = (
      <>
        {userProducts.products.map((product) => (
          <div key={product._id} className={classes.productsBox__product}>
            <div className={classes[`productsBox__product--name`]}>
              <img src={product.imageUrl} alt={product.name} width={100} />
              <p>{product.name}</p>
            </div>
            <div className={classes[`productsBox__product--buttons`]}>
              <div>
                <Link to={`/produkt/${product._id}/edit`}>
                  <button
                    type="button"
                    className={classes[`productsBox__product--button`]}
                  >
                    <AiFillEdit />
                  </button>
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => {
                    deleteProductHandler(product._id);
                  }}
                  className={classes[`productsBox__product--button`]}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <div className={classes.mainContainer}>
      <h4>Zarządzaj asortymentem:</h4>
      <div className={classes.newProductBox}>
        <h5>Dodaj nowy produkt za pomocą poniższego przycisku:</h5>
        <Link to="/konto/nowy-produkt">
          <button type="button">DODAJ PRODUKT</button>
        </Link>
      </div>
      <div className={classes.productsBox}>
        <h5>Twoje produkty:</h5>
        {content}
      </div>
    </div>
  );
};

export default ProductsManage;
