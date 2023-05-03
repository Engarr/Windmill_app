import express from 'express';
const router = express.Router();
import isAuth from '../middleware/is-auth.js';
import { getUser } from '../controllers/feed.js';

router.get('/user', isAuth, getUser);

export default router;
