import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const signup = async (req, res, next) => {
    
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
