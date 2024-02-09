import * as express from 'express'
const router = express.Router();
import * as recipeController from '../controllers/recipeController'
import * as authController from '../controllers/authController'

router.route('/')
  .get(authController.protect, recipeController.getAllRecipes)
  .post(authController.protect, recipeController.createRecipe)

// router.route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour)

export default router