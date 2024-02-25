import { IUserRequest } from "@types";
import { NextFunction, Response } from "express";
import userModel from "../../models/userModel";
import AppError from "../../utils/appError";
import { createSendToken } from "./createSendToken";

export const updatePassword = async (req: IUserRequest, res: Response, next: NextFunction) => {
  // 1) get user from collection
  const user = await userModel.findById(req.user.id).select('+password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  // 2) check if posted current password is correct
  if (!await user.correctPassword(req.body.passwordCurrent, user.password)) {
    return next(new AppError('Your current password is wrong', 401));
  }
  // 3) if so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) log user in, send JWT
  createSendToken(user, 200, res);
}
