import { Types, Document } from "mongoose"

export interface ITour extends Document {
  priceDiscount: 0,
  _id: Types.ObjectId,
  name: string,
  duration: number,
  maxGroupSize: number,
  difficulty: string,
  ratingsAverage: number,
  ratingsQuantity: number,
  price: number,
  summary: string,
  description: string,
  imageCover: string,
  images: string[],
  startDates: string[],
  createdAt: Date,
  queryStart: any,
  find: any,
  slug: string,
  secretTour: boolean,
}

export interface IUser extends Document {
  name: string,
  email: string,
  photo: string,
  password: string,
  passwordConfirm: string,
  passwordChangedAt: Date,
}

type Unit = 'gream' | 'kilo' | 'ml' | 'l' | 'theelepel' | 'eetlepel' | 'pond'

export interface IIngredient {
  name: string,
  amount: number,
  unit: Unit,
  _id: string,
}

export interface IRecipe extends Document {
  _id: Types.ObjectId,
  name: string,
  slug: string,
  createdAt: Date,
  ingredients: IIngredient[],
  steps: string[],
}
