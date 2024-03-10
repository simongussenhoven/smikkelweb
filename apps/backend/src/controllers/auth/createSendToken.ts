import { IUser, IUserResponse } from "@types";
import { signToken } from '../../utils/signToken';
import { CookieOptions, Response } from 'express';

export const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JTW_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: "none"
  } as CookieOptions
  res.cookie('token', token, cookieOptions)
  res.status(statusCode).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo,
        token
      }
    }
  });
}