import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routers/auth.js';
const port = process.env.VITE_API_PORT || 8080;
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
///
app.use('/data', (req, res, next) => {
  const date = new Date().getFullYear();
  res.send(date.toString());
});
///
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
