import { IUserRequest } from "@types";
import { NextFunction, Response } from "express";
import AppError from "../../utils/appError";

export const restrictTo = (...roles: string[]) => {
  return (req: IUserRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  }
}
