import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth.js';
import { getUser, postAddProduct } from '../controllers/feed.js';
import { body } from 'express-validator';

router.get('/user', isAuth, getUser);
router.post(
  '/add-product',
  [
    body('name').notEmpty().withMessage('To pole nie może byc puste'),
    body('category', 'Proszę wybrać kategorię').notEmpty(),
    body('price')
      .notEmpty()
      .withMessage('To pole nie może byc puste')
      .isDecimal({ decimal_digits: '1,2' })
      .withMessage('Cena musi zawierać liczbę do 2 miejsc po przecinku')
      .isFloat({ min: 0.01 })
      .withMessage('Cena musi być liczbą dodatnią'),
    body('description')
      .notEmpty()
      .withMessage('To pole nie może byc puste')
      .isLength({ max: 500 })
      .withMessage('Opis produktu nie może być dłuższy niż 500 znaków'),
  ],
  postAddProduct
);

export default router;
