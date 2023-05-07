import express from 'express';
import path from 'path';
const router = express.Router();
import isAuth from '../middleware/is-auth.js';
import { getUser, postAddProduct } from '../controllers/feed.js';
import { body } from 'express-validator';

import multer, { memoryStorage } from 'multer';
const upload = multer({ storage: memoryStorage() });

const imageValidator = (value, { req }) => {
  if (!req.file) {
    throw new Error('Nie wybrano pliku zdjęciowego.');
  }
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const extension = path.extname(req.file.originalname);
  if (!allowedExtensions.test(extension)) {
    throw new Error('Dozwolone rozszerzenia plików to .jpg, .jpeg, .png');
  }
  return true;
};

router.get('/user', isAuth, getUser);
router.post(
  '/add-product',
  upload.single('image'),
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
    body('image').custom(imageValidator),
  ],
  postAddProduct
);

export default router;
