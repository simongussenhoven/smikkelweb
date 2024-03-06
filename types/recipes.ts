import { Model } from "mongoose";
import { Request } from "express";

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
  _id: string,
  category: IDropdownOption,
  description: string,
  glutefree: boolean,
  images: File[],
  ingredients: IIngredient[],
  lactofree: boolean,
  requirements: IRequirement[],
  servings: number,
  steps: string[],
  time: number,
  title: string,
  vegan: boolean,
  vegetarian: boolean,
}

export type IRecipeModel = Model<IRecipe>;

export interface IRecipeRequest extends Request { }
