import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth.js';

import { addToCart, getCartProducts } from '../controllers/cartFeed.js';

router.put('/addToCart', addToCart);
router.get('/getCartProducts', isAuth, getCartProducts);
export default router;
