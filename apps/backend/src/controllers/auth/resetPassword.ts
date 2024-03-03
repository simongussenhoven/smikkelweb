import { IUserRequest } from "@types";
import { NextFunction, Response } from "express";
import crypto from 'crypto';
import userModel from "../../models/userModel";
import AppError from "../../utils/appError";
import { createSendToken } from "./createSendToken";

export const resetPassword = async (req: IUserRequest, res: Response, next: NextFunction) => {
  // get user based on token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await userModel.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

  // check if token expired
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // if token has not expired and there is a user, set the new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  //3) update changedPasswordAt property for the user
  user.passwordChangedAt = new Date();

  await user.save();
  createSendToken(user, 200, res);
}
