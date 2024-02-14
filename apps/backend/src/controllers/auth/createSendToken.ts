import { IUser } from "@types";
import { signToken } from '../../utils/signToken';
import { Response } from 'express';

export const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JTW_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
  res.cookie('jwt', token, cookieOptions)
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}