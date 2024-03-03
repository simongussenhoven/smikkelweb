import { NextFunction, Response } from "express"
import userModel from "../../models/userModel"
import { IUserRequest } from "@types"

export const getUsers = async (req: IUserRequest, res: Response, next: NextFunction) => {
  const users = await userModel.find()
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  })
}