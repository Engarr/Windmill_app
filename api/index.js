import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routers/auth.js';

app.use(cors());
app.use(bodyParser.json());
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

app.use('/auth', authRouter);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.satusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

if (process.env.VITE_API_PORT) {
  mongoose

    .connect(process.env.MONGODB_URI)

    .then((result) => {
      app.listen(process.env.VITE_API_PORT);
      console.log('server is running');
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  mongoose
    .connect(process.env.MONGODB_URI)

    .catch((err) => {
      console.log(err);
    });
}

export default app;
