import jwt from 'jsonwebtoken';
import User from '../../models/userModel';
import { promisify } from 'util';
import AppError from '../../utils/appError';

export const checkToken = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(200).json({
      status: 'success',
      data: { user: null }
    });
  }

  try {
    //@ts-expect-error, error in promisify type
    const decoded: any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }
    req.user = user;
    res.status(200).json({ status: 'success', data: { user } });
  } catch (error) {
    return next(new AppError('Internal server error', 500))
  }
};