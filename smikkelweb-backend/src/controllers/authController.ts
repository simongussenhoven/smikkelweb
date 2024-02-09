
import { promisify } from 'util'
import User from '../models/userModel'
import { IUser } from '../types'
import AppError from '../utils/appError'
import handleError from '../utils/errorHandler'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN })
}

// new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await User.create(req.body)
    const token = signToken(newUser._id)

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    })
  }
  catch (err) {
    handleError(err, res)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    // handle missing request body params
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }

    // check for user and correct password
    const user: IUser = await User.findOne({ email }).select('+password')
    if (!user || !await user.schema.methods.correctPassword(password, user.password)) {
      return next(new AppError('Incorrect email of password', 401))
    }

    // return token
    const token = signToken(user._id)
    res.status(200).json({
      status: 'success',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token
      }
    })
  }
  catch (err) {
    handleError(err, res)
  }
}
// 
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // getting token
    let token: string
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(" ")[1];
    }

    // check existence
    if (!token!) {
      return next(new AppError('Not logged in', 401))
    }

    // verify token
    //@ts-ignore: problem with promisify is obscure
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) as any
    console.log(decoded)
    // check if user still exists
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
      return next(new AppError('The user belonging to this token does no longer exist', 401))
    }

    // check if user changed password after JWT token was issued
    if (freshUser.schema.methods.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('User recently changed password! Please log in again', 401))
    }
    next();
  }
  catch (err) {
    handleError(err, res)
  }

  next()
}