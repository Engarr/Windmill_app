import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routers/auth.js';
import feedRouter from './routers/feed.js';

const app = express();
const port = process.env.VITE_API_PORT || 8080;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '.' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);



app.use(
  '/images',
  express.static(path.join(process.env.VITE_PATH_IMAGES, 'images'))
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-User-Id'
  );
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/feed', feedRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.satusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error.message);
  });

export default app;
