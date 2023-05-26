// import { useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { cartItemAction } from '../../../store/cartSlice';
// import { useGetProductsByIdQuery } from '../../../store/api/productsApiSlice';
// import Spinner from '../../Spinner/Spinner/Spinner';
// import CartProduct from '../../CartProduct/CartProduct';
// import classes from '../../../pages/Cart/Cart.module.scss';
// import { RootState } from '../../../store/store';
// import { ProductType } from '../../../types/types';

// interface StorageItemsArrType {
//   data: {
//     products: ProductType[];
//   };
//   isLoading: boolean;
// }

// const NotRegisteredCart = () => {
//   const dispatch = useDispatch();
//   const storageItems = useSelector((state: RootState) => state.cartItems.items);
//   const idArr = storageItems.map(({ productId }) => productId);

//   const { data: storageItemsArr, isLoading } =
//     useGetProductsByIdQuery<StorageItemsArrType>(
//       idArr.length > 0 ? idArr : undefined
//     );

//   const newArr = useMemo(() => {
//     if (storageItems && storageItemsArr?.products) {
//       return storageItems.map((item) => {
//         const product = storageItemsArr.products.find(
//           (p) => p._id === item.productId
//         );
//         return {
//           product,
//           quantity: item.quantity,
//         };
//       });
//     }
//     return [];
//   }, [storageItems, storageItemsArr]);

//   const increaseHandler = (id: string) => {
//     dispatch(cartItemAction.onIncreaseQty(id));
//   };
//   const decreaseHandler = (id: string) => {
//     dispatch(cartItemAction.onDecreaseQty(id));
//   };

//   let content;
//   if (isLoading) {
//     content = <Spinner message="Ladowanie.." />;
//   } else if (newArr && newArr.length <= 0) {
//     content = (
//       <div className={classes.emptyCart}>
//         <h2>Twój koszyk jest pusty</h2>
//         <Link to="/sklep">
//           <button type="button">Wróć do sklepu</button>
//         </Link>
//       </div>
//     );
//   } else if (newArr) {
//     content = (
//       <CartProduct
//         products={newArr as []}
//         increaseHandler={increaseHandler}
//         decreaseHandler={decreaseHandler}
//       />
//     );
//   }

//   return <div>{content}</div>;
// };
// export default NotRegisteredCart;
