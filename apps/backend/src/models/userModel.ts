import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, UserModel, IUserMethods } from '@types'
import crypto from 'crypto';


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    unique: true,
    required: [true, 'Name required'],
  },
  email: {
    type: String,
    required: [true, 'Provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email']
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm password'],
    validate: {
      validator: function (this: IUser, el: string) {
        return el === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now()
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  photo: {
    type: String,
    default: 'default-user.png'
  }
});

userSchema.pre('save', async function (next) {
  // only run if password is modified
  if (!this.isModified('password')) next()

  // has with 12 cost
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()
  this.passwordChangedAt = new Date(Date.now() - 1000)
  next()
})

userSchema.methods.generateToken = function (): string {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  return token;
};

userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    return JWTTimestamp < this.passwordChangedAt.getTime() / 1000
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
}

export default model('User', userSchema);