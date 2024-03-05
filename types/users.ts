import { Model, Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  username: string,
  email: string,
  role: string,
  password: string,
  passwordConfirm: string,
  passwordChangedAt: Date,
  passwordResetToken: string,
  passwordResetExpires: Date,
  token: string,
  active: boolean,
  photo: string,
}

export type UserModel = Model<IUser, {}, IUserMethods>;

export interface IUserMethods {
  generateToken(): string,
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>,
  changedPasswordAfter(JWTTimestamp: number): boolean
  createPasswordResetToken(): string
}

export interface IUserRequest extends Request {
  username: string,
  email: string,
  role: string,
  password: string,
  passwordConfirm: string,
  passwordChangedAt: Date,
  user: IUser
}

export interface INewUserRequest {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
}

export interface ILoginRequest extends Request {
  email: string,
  password: string
}