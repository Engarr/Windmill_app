import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useGetUserProductQuery,
  useDeleteProductMutation,
} from '../../../store/api/productsApiSlice';
import Spinner from '../../Spinner/Spinner/Spinner';

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
          <div key={product._id}>
            <div>
              <img src={product.imageUrl} alt={product.name} width={100} />
              <p>{product.name}</p>
            </div>
            <div>
              <Link to={`/produkt/${product._id}/edit`}>
                <button type="button">Edytuj produkt</button>
              </Link>
            </div>
            <div>
              <button
                type="submit"
                onClick={() => {
                  deleteProductHandler(product._id);
                }}
              >
                Usuń produkt
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <div>
      <h4>Zarządzaj asortymentem:</h4>
      <Link to="/konto/nowy-produkt">
        <button type="button">DODAJ PRODUKT</button>
      </Link>
      <div>
        <h5>Twoje produkty:</h5>
        {content}
      </div>
    </div>
  );
};

export default ProductsManage;
