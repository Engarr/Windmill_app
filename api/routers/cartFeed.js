import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth.js';

import {
  addToCart,
  getCartProducts,
  removeProduct,
} from '../controllers/cartFeed.js';

router.put('/addToCart', addToCart);
router.get('/getCartProducts', isAuth, getCartProducts);
router.delete('/deleteProduct', isAuth, removeProduct);
export default router;
