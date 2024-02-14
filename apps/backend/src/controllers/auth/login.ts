import { IUserRequest } from "@types"
import { NextFunction, Response } from "express"
import AppError from "../../utils/appError"
import userModel from "../../models/userModel"
import { createSendToken } from "./createSendToken"

export const login = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    // handle missing request body params
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }

    // check for user and correct password
    const user = await userModel.findOne({ email }).select('+password')
    if (!user || !await user.correctPassword(password, user.password)) {
      return next(new AppError('Incorrect email or password', 401))
    }

    // return token
    createSendToken(user, 200, res)
  }
  catch (err) {
    next(new AppError('Failed to login', 500))
  }
}
