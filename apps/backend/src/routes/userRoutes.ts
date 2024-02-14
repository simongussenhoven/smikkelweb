import * as express from 'express'
const router = express.Router();
// import * as userController from '../controllers/userController'
import * as authController from '../controllers/auth'

// get
router.all('/', (req, res, next) => {
  console.log({
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.patch('/updatePassword', authController.protect, authController.updatePassword)

export default router
