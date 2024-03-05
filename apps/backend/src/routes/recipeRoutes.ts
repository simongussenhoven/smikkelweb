import * as express from 'express'
const router = express.Router();
import * as authController from '../controllers/auth'
import * as recipeConstroller from '../controllers/recipeController'

// restricted to admin, moderator, user
router.get('/', recipeConstroller.getRecipes)
router.post('/', authController.protect, recipeConstroller.addRecipe)

export default router
