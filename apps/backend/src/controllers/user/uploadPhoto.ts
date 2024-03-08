import multer from 'multer';;
import { IUserRequest } from '@types';
import AppError from '../../utils/appError';

const multerStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users');

  },
  filename: (req: IUserRequest, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}.${ext}`);
  }
});

const multerFilter = (req: IUserRequest, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);

  } else {
    // @ts-expect-error
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
}

export const uploadPhoto = multer({
  storage: multerStore,
  fileFilter: multerFilter
}).single('photo');