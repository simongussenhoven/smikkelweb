import { IRecipeRequest } from "@types";
import { NextFunction, Response } from "express";
import recipeModel from "../models/recipeModel";
import AppError from "../utils/appError";

export const getRecipes = async (req: IRecipeRequest, res: Response, next: NextFunction) => {
  console.log('Getting recipes')
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
    console.error(error)
    return next(new AppError('Failed to get recipes', 500))
  }
}

export const addRecipe = async (req: IRecipeRequest, res: Response, next: NextFunction) => {
  console.log('Registering recipe')
  try {
    console.log(req.body)
    // const { username, password, email, passwordConfirm } = req.body;
    // if (!username || !password || !email || !passwordConfirm) {
    //   res.status(400).json({
    //     status: 'error',
    //     message: 'Please provide username, email, password and passwordConfirm'
    //   })
    //   return
    // }
    // Check if user already exists
    // const existingUser = await recipeModel.findOne({ username });
    // if (existingUser) {
    //   res.status(400).json({
    //     status: 'error',
    //     message: 'User already exists'
    //   })
    //   return
    // }

    // Create a new user
    // const newUser = new recipeModel({ username, password, email, passwordConfirm });
    // await newUser.save();
    // createSendToken(newUser, 201, res)
    const newRecipe = new recipeModel(req.body);
    await newRecipe.save();
    res.status(201).json({
      status: 'success',
      data: {
        recipe: newRecipe
      }
    })
  } catch (error) {
    console.error(error)
    return next(new AppError('Failed to register recipe', 500))
  }
};