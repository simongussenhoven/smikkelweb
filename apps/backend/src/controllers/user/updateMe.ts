import { NextFunction, Response } from "express";
import User from "../../models/userModel";
import { IUserRequest } from "@types";

const filterObj = (obj: any, ...allowedFields: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

export const updateMe = async (req: IUserRequest, res: Response, next: NextFunction) => {
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      status: 'fail',
      message: 'This route is not for password updates. Please use /updateMyPassword'
    })
  }

  const filteredBody = filterObj(req.body, 'username', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  const existingEmailUser = await User.findOne({ email: filteredBody.email });
  if (existingEmailUser && existingEmailUser.id !== req.user.id) {
    return res.status(400).json({
      status: 'fail',
      message: 'Emailadress in use'
    })
  }

  const existingUserName = await User.findOne({ username: filteredBody.username });
  if (existingUserName && existingUserName.id !== req.user.id) {
    return res.status(400).json({
      status: 'fail',
      message: 'Username in use'
    })
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    message: 'User updated',
    data: {
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        photo: updatedUser.photo
      }
    }
  })
}

