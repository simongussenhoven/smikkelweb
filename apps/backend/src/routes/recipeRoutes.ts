import * as express from 'express'
const router = express.Router();
import * as authController from '../controllers/auth'

// get
router.all('/', (req, res, next) => {
  console.log('recipe request received');
  console.log({
    method: req.method,
    path: req.path,
    body: req.body
  });
  res.status(200).json({ message: 'Recipe request received' });
  next();
});

// restricted to admin, moderator, user
router.post('/', authController.protect, authController.restrictTo('admin', 'moderator', 'user'), (req, res) => {
  console.log('recipe created');
})

export default router
