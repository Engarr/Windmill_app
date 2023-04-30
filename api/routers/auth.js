import express from 'express';
const router = express.Router();
import { signup } from '../controllers/auth.js';

router.put('/signup', signup);

export default router;
