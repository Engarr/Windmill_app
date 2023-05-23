import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { ProductType } from '../../types/types';
import classes from './CartProduct.module.scss';
import { useDeleteCartProductMutation } from '../../store/apiSlice';

interface PropsType {
  products: {
    product: ProductType;
    quantity: number;
  }[];
  token: string;
}

const CartProduct = ({ products, token }: PropsType) => {
  const [deleteProductFromCart] = useDeleteCartProductMutation();

  const removeProduct = async (prodId: string, name: string) => {
    try {
      toast.success(`Produkt: ${name} został usunięty z koszyka`);
      await deleteProductFromCart({
        productId: prodId,
        token,
      });
    } catch (error) {
      toast.error('Wystąpił błąd podczas dodawania produktu do koszyka.');
    }
  };
  return (
    <div className={classes.container}>
      <table>
        <tbody>
          <th>{}</th>
          <th>Nazwa</th>
          <th>Cena</th>
          <th>Ilość</th>
          <th>Suma</th>
          <th>{}</th>
          {products.map((product) => (
            <tr key={product.product._id}>
              <td>
                <div className={classes.container__imgBox}>
                  <img
                    src={product.product.imageUrl}
                    width={120}
                    alt={product.product.name}
                  />
                </div>
              </td>
              <td data-cell="Nazwa:">
                <div className={classes.container__nameBox}>
                  <Link to={`/produkt/${product.product._id}`}>
                    <p>{product.product.name}</p>
                  </Link>
                </div>
              </td>
              <td data-cell="Cena:">
                <div className={classes.container__priceBox}>
                  <p>{product.product.price} zł</p>
                </div>
              </td>
              <td data-cell="Ilość:">
                <div className={classes.container__qtyBox}>
                  <button type="button">+</button>
                  <p> {product.quantity}</p>
                  <button type="button">-</button>
                </div>
              </td>
              <td data-cell="Suma:">
                <div className={classes.container__sumBox}>
                  <p>{product.quantity * product.product.price} zŁ</p>
                </div>
              </td>
              <td>
                <div
                  className={classes.container__deleteBox}
                  onClick={() => {
                    removeProduct(product.product._id, product.product.name);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      removeProduct(product.product._id, product.product.name);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <RiDeleteBinLine
                    className={classes['container__deleteBox--icon']}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartProduct;