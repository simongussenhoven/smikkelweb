import Recipe from '../models/recipeModel'
import { Request, Response, NextFunction } from "express";
import APIFeatures from '../utils/apiFeatures';
import handleError from '../utils/errorHandler';

// Alias middleware
// export const aliasTopTours = (req: Request, res: Response, next: NextFunction) => {
//   req.query.limit = '5';
//   req.query.sort = 'price,-ratingsAverage';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// }

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(Recipe.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const recipes = await features.query

    res.status(200).json({
      status: 'success',
      results: recipes.length,
      recipes
    })
  }
  catch (err: any) {
    handleError(err, res)
  }
}

export const createRecipe = async (req: Request, res: Response) => {
  console.log("createRecipe")
  try {
    const newRecipe = await Recipe.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newRecipe
      }
    })
  }
  catch (err: any) {
    handleError(err, res)
  }
}

// export const getTour = async (req: Request, res: Response) => {
//   try {
//     const tour = await Tour.findById(req.params.id)
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour
//       }
//     })
//   }
//   catch (err: any) {
//     handleError(err, res)
//   }
// }



// export const updateTour = async (req: Request, res: Response) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     })
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour
//       }
//     })
//   }
//   catch (err: any) {
//     handleError(err, res)
//   }
// }

// export const deleteTour = async (req: Request, res: Response) => {
//   try {
//     await Tour.findByIdAndDelete(req.params.id)
//     res.status(200).json({
//       status: 'success',
//       data: null
//     })
//   }
//   catch (err: any) {
//     handleError(err, res)
//   }
// }

// export const getTourStats = async (req: Request, res: Response) => {
//   try {
//     const stats = await Tour.aggregate([
//       {
//         $match: { ratingsAverage: { $gte: 4.5 } }
//       },
//       {
//         $group: {
//           _id: { $toUpper: '$difficulty' },
//           num: { $sum: 1 },
//           numRatings: { $sum: '$ratingsQuantity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         }
//       },
//       {
//         $sort: { avgPrice: -1 }
//       },
//       {
//         $match: { _id: { $ne: 'EASY' } }
//       }
//     ])
//     res.status(200).json({
//       status: 'success',
//       data: {
//         stats
//       }
//     })
//   }
//   catch (err: any) {
//     handleError(err, res)
//   }
// }

// skipping outdated part of course

// exports.getMonthlyPlan = async (req: any, res: any) => {
//     try {
//         const year = req.params.year * 1; //2021

//         const plan = await Tour.aggregate([
//             {
//                 $unwind: '$startDates'
//             },
//             {
//                 $match: {
//                     startDates: {
//                         $gte: new Date(`${year}-01-01`),
//                         $lte: new Date(`${year}-12-31`),
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: {
//                         month: { $month: new Date('startDates') },
//                         numTourStarts: { $sum: 1 }
//                     },

//                 }
//             }
//         ]);

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 plan
//             }
//         });
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         });
//     }
// }