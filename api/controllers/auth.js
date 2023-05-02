import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

export const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
    });
    const result = await user.save();
    res
      .status(201)
      .json({ message: 'User has been created', userId: result._id });
  } catch (err) {
    if (!err) {
      err.statusCode = 500;
      err.message = 'something went wrong';
    }
    next(err);
  }
};
