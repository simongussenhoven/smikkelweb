import { IRecipeRequest } from "@types";
import { NextFunction, Response } from "express";
import recipeModel from "../models/recipeModel";
import AppError from "../utils/appError";

export const getRecipe = async (req: IRecipeRequest, res: Response, next: NextFunction) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        recipe
      }
    })
  }
  catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: 'Failed to get recipe'
    })
  }

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