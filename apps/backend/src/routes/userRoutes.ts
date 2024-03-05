import * as express from 'express'
const router = express.Router();
import * as authController from '../controllers/auth'
import { checkToken } from '../controllers/auth/'
import * as userController from '../controllers/user'

router.get('/getUsers', authController.protect, authController.restrictTo('admin'), userController.getUsers)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.patch('/updatePassword', authController.protect, authController.updatePassword)
router.patch('/updateMe', authController.protect, userController.uploadPhoto, userController.updateMe)
router.get('/checkToken', checkToken);
router.get('/logout', authController.logout)
router.delete('/deleteMe', authController.protect, userController.deleteMe)

export default router
