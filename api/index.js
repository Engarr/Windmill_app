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

mongoose
  .connect(
    `mongodb+srv://Lukasz:${process.env.VITE_API_MOONGOSE_PASS}@cluster0.k4a8s6m.mongodb.net/windmil?retryWrites=true`
  )
  .then((result) => {
    app.listen(process.env.VITE_API_PORT);
    console.log('server is running');
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
