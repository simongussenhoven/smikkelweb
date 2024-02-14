import jwt from 'jsonwebtoken'

export const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
}