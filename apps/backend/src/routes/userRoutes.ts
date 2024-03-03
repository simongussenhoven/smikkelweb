import * as express from 'express'
const router = express.Router();
import * as authController from '../controllers/auth'
import { checkToken } from '../controllers/auth/'

router.get('/getUsers', authController.protect, authController.restrictTo('admin'), authController.getUsers)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.patch('/updatePassword', authController.protect, authController.updatePassword)
router.patch('/updateMe', authController.protect, authController.updateMe)
router.get('/checkToken', checkToken);
router.get('/logout', authController.logout)
router.delete('/deleteMe', authController.protect, authController.deleteMe)

export default router
