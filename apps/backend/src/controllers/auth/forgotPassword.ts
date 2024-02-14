import { IUserRequest } from "@types";
import userModel from "../../models/userModel";
import AppError from "../../utils/appError";
import { sendEmail } from "../../utils/emailer";
import { NextFunction, Response } from "express";

export const forgotPassword = async (req: IUserRequest, res: Response, next: NextFunction) => {
  // get user based on posted email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  // generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
  const message = `Forgot password? Submit a PATCH request with new password and confirm to ${resetURL}. \n Not you? Ingnore this.`
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset, valid for 10 min',
      message
    })
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    })
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error sending the email. Try again later', 500));
  }
}