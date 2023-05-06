import Product from '../models/product.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { storage } from '../config/firebase.config.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


export const getUser = async (req, res, next) => {
  const userId = req.userId;
  res.status(200).json({ userId: userId });
};

export const postAddProduct = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array() });
  }
  const image = req.file;
  if (!image || image.length === 0) {
    const error = new Error('No images provided.');
    error.statusCode = 422;
    throw error;
  }
  const metadata = {
    contentType: req.file.mimetype,
  };
  const storageRef = ref(storage, `images/${uuidv4() + image.originalname}`);
  const snapshot = await uploadBytesResumable(
    storageRef,
    image.buffer,
    metadata
  );
  const imageUrl = await getDownloadURL(snapshot.ref);

  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const userId = req.body.userId;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    price: price,
    description: description,
    category: category,
    creator: userId,
    imageUrl: imageUrl,
  });
  try {
    const result = await product.save();
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Could not find user');
      error.statusCode = 422;
      throw error;
    }
    user.products.push(product._id);
    await user.save();
    res.status(200).json({ message: 'product has been created', data: result });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
    }
    next(err);
  }
};
