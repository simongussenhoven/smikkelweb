import { Schema, model } from 'mongoose'
import validator from 'validator'
import { IUser } from '../types'
import { NextFunction } from 'express'
import bcrypt from 'bcryptjs'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please fill in a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please fill in a password'],
    minLength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please match the password'],
    validate: {
      validator: function (this: IUser, val: string) {
        return this.password === val
      },
      message: "Password does not match"
    },
    select: false
  },
  passwordChangedAt: {
    type: Date
  }
})

// encrypt password
userSchema.pre<IUser>('save', async function (next) {
  // only run if password is modified
  if (!this.isModified('password')) next()

  // has with 12 cost
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = ''
  next()
})


userSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    console.log('password changed')
    console.log(this.passwordChangedAt, JWTTimestamp)
  }
  return false
}

const User = model('User', userSchema)
export default User
