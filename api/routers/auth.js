import express from 'express';
const router = express.Router();
import { signup } from '../controllers/auth.js';
import { body } from 'express-validator';
import User from '../models/User.js';

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage(' Proszę podać poprawny adres e-mail.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Adres email już istnieje!');
          }
        });
      })
      .normalizeEmail()
      .trim(),
    body(
      'password',
      'Hasło musi zawierać co najmniej jedną wielką literę i jeden znak specjalny oraz byc dłuższe niz 5 znaków'
    )
      .isLength({ min: 5 })
      .matches(/^(?=.*[A-Z])(?=.*[!@#$&*])/),
    body('repeatPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject('Hasła muszą być identyczne');
      }
      return true;
    }),
  ],
  signup
);

export default router;