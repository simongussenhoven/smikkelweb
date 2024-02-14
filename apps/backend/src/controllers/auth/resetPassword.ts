import { IUserRequest } from "@types";
import { NextFunction, Response } from "express";
import crypto from 'crypto';
import userModel from "../../models/userModel";
import AppError from "../../utils/appError";
import { createSendToken } from "./createSendToken";

export const resetPassword = async (req: IUserRequest, res: Response, next: NextFunction) => {
  // 1) get user based on token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await userModel.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
  // 2) if token has not expired and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  //2 ) if token has not expired and there is a user, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3) update changedPasswordAt property for the user


  //4) log the user in, send JWT
  createSendToken(user, 200, res);
}
