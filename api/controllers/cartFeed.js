import Product from '../models/product.js';
import User from '../models/user.js';

export const addToCart = async (req, res, next) => {
  const userId = req.body.userId;
  const quantity = req.body.quantity;
  const productId = req.body.productId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }
    const existingItem = user.cart.find((prod) => prod.productId === productId);
    if (!existingItem) {
      user.cart.push({ productId: productId, quantity: quantity });
    } else {
      existingItem.quantity = existingItem.quantity + quantity;
    }

    await user.save();
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const getCartProducts = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Could not find user.');
      error.statusCode = 404;
      throw error;
    }
    const userCart = user.cart;

    const promises = userCart.map(async (item) => {
      const product = await Product.findById(item.productId);
      return { product: product, quantity: item.quantity };
    });
    const prodArr = await Promise.all(promises);
    res.status(200).json({ prodArr: prodArr });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
    }
    next(err);
  }
};
