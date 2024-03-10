import { IRecipeRequest } from "@types";
import { NextFunction, Response } from "express";
import recipeModel from "../models/recipeModel";
import AppError from "../utils/appError";

export const getRecipe = async (req: IRecipeRequest, res: Response, next: NextFunction) => {
  const recipe = await recipeModel.findById(req.params.id);
  if (!recipe) return next(new AppError('No recipe found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      recipe
    }
  })
}

export const getRecipes = async (req: IRecipeRequest, res: Response, next: NextFunction) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json({
      status: 'success',
      results: recipes.length,
      data: {
        recipes
      }
    })
  } catch (error) {
    return next(new AppError('Failed to get recipes', 500))
  }
}

export const addRecipe = async (req: IRecipeRequest, res: Response, next: NextFunction) => {
  try {
    const newRecipe = new recipeModel(req.body);
    await newRecipe.save();
    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe
      }
    })
  } catch (error) {
    return next(new AppError('Failed to register recipe', 500))
  }
};