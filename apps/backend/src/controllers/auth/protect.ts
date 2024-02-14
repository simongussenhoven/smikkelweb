import { IUserRequest } from "@types";
import { NextFunction, Response } from "express";
import AppError from "../../utils/appError";
import userModel from "../../models/userModel";
import { promisify } from 'util';

export const protect = async function (req: IUserRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null
    if (!token) {
      return next(new AppError('Please login to access this resource', 401));
    }

    // verify token
    // @ts-expect-error: promisify does not have types
    const decoded: any = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // check if user still exists
    const freshUser = await userModel.findById(decoded.id)
    if (!freshUser) {
      return next(new AppError('User no longer exists', 401));
    }

    // check if user changed password after token was issued
    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('User recently changed password! Please login again', 401));
    }

    // grant access to protected route
    req.user = freshUser
    next();
  }
  catch (err) {
    return next(new AppError('Internal server error', 500))
  }
}