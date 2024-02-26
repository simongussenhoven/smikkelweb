import { IUserRequest } from "@types";
import userModel from "../../models/userModel";
import AppError from "../../utils/appError";
import { sendEmail } from "../../utils/emailer";
import { NextFunction, Response } from "express";

interface IEmailOptions {
  email: string;
  subject: string;
  resetURL: string;
}

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
  const base = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.smikkelweb.com'
  const resetURL = `${base}/?token=${resetToken}`
  try {
    const emailOptions: IEmailOptions = {
      email: user.email,
      subject: 'Wachtwoord reset, 10 minuten geldig',
      resetURL
    }
    await sendEmail(emailOptions)
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