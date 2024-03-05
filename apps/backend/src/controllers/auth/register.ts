import { IUserRequest } from "@types";
import { NextFunction, Response } from "express";
import userModel from "../../models/userModel";
import { createSendToken } from './createSendToken';
import AppError from "../../utils/appError";

export const register = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { username, password, email, passwordConfirm } = req.body;
    if (!username || !password || !email || !passwordConfirm) {
      res.status(400).json({
        status: 'error',
        message: 'Please provide username, email, password and passwordConfirm'
      })
      return
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'User already exists'
      })
      return
    }

    // Create a new user
    const newUser = new userModel({ username, password, email, passwordConfirm });
    await newUser.save();
    createSendToken(newUser, 201, res)

  } catch (error) {
    return next(new AppError('Failed to register user', 500))
  }
};