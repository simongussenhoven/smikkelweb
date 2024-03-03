import { Request, Response } from 'express';
import User from '../../models/userModel';
import { IUserRequest } from '@types';

export const deleteMe = async (req: IUserRequest, res: Response) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    message: 'User deleted',
    data: null
  })
}