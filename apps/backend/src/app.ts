import globalErrorHandler from './controllers/errorController'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import express, { NextFunction, Request, Response } from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import recipeRoutes from './routes/recipeRoutes';
import AppError from './utils/appError';
import cors from 'cors'
import corsOptions from './config/corsOptions';
import dotenv from 'dotenv';

// define environment variables
const envPath = process.env.NODE_ENV === 'production' ? './config.production.env' : './config.env'
dotenv.config({ path: envPath });

// init app
const app = express();
app.use('/api/v1/public', express.static(path.join(__dirname, '../../../public')));

// only enable cors on dev
if (process.env.NODE_ENV === 'development') app.use(cors(corsOptions))

// middleware security
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

const limitOptions = {
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
}
const limiter = rateLimit(limitOptions)
if (process.env.NODE_ENV === 'production') app.use('/api', limiter)

// other middleware


app.use(express.json({ limit: '5000kb' }))
app.use(globalErrorHandler)
app.use(cookieParser())
app.use(logger('dev'))

// connect to the database
mongoose.connect(process.env.DB_STRING).then(() => {
  console.info('Connected to the database');
})

// routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/recipes', recipeRoutes)

// get the status of the API
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API'
  });
});

// catch all other routes
app.all('*', (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 500))
});

export default app
