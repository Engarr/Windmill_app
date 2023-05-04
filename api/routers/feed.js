import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth.js';
import { getUser, postAddProduct } from '../controllers/feed.js';

router.get('/user', isAuth, getUser);
router.post('/add-product', postAddProduct);

export default router;
