import * as express from 'express'
const router = express.Router();
import * as userController from '../controllers/userController'
import * as authController from '../controllers/authController'

router.post('/register', authController.register)
router.post('/login', authController.login)

router.route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser)

router.route('/:id')
  .all(authController.protect)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

export default router
