import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
// import tourRouter from './routes/tourRoutes'
import userRouter from './routes/userRoutes'
import recipeRoute from './routes/recipeRoutes'
import cors from 'cors'

//define app
const app = express();
import AppError from './utils/appError';
import errorController from './controllers/errorController'

// middleware
if (process.env.NODE_ENV === 'development') app.use(logger('combined'))
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

// routes
// app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// recipes
app.use('/api/v1/recipes', recipeRoute)

// error handling
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(errorController)

export default app