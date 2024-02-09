
import User from '../models/userModel'
import handleError from '../utils/errorHandler';
import { Request, Response, NextFunction } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    })
  }
  catch (err: any) {
    handleError(err, res)
  }
}

export const getUser = ((req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined'
  })
})

export const createUser = ((req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined'
  })
})

export const updateUser = ((req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined'
  })
})

export const deleteUser = ((req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined'
  })
})
