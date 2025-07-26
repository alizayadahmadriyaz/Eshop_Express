// middlewares/auth.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
    console.log("enc key   ",process.env.JWT_SECRET)
    console.log(" token   ",token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
    console.log("idddddddd ",decoded.id)
    req.user = await User.findById(decoded.id).select('-password');
    next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
};

export default protect;