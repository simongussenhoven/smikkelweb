// import * as express from 'express'
// const router = express.Router();
// import * as tourController from '../controllers/tourController'
// import * as authController from '../controllers/authController'

// // routes
// router.route('/top-5-cheap')
//   .get(tourController.aliasTopTours, tourController.getAllTours)

// router.route('/tour-stats').get(tourController.getTourStats)

// // skipping outdated part of course
// // router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

// router.route('/')
//   .get(authController.protect, tourController.getAllTours)
//   .post(tourController.createTour)

// router.route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour)

// export default router