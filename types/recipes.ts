import { Request } from "express";
import { Model } from "mongoose";

export interface IDropdownOption {
  id: number,
  value: string,
  label: string
}

export interface IIngredient {
  name: string,
  amount: number,
  unit: string,
}

export interface IRequirement {
  name: string,
  amount: number,
}

export interface IRecipe {
  _id: number,
  category: IDropdownOption,
  description: string,
  glutefree: boolean,
  images: File[],
  ingredients: IIngredient[],
  lactofree: boolean,
  requirements: IRequirement[],
  servings: number,
  steps: { description: string }[],
  time: number,
  title: string,
  vegan: boolean,
  vegetarian: boolean,
}

export type IRecipeModel = Model<IRecipe>;

export interface IRecipeRequest extends Request {
  id: string
}
