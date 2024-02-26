import express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import recipeRoutes from './routes/recipeRoutes';
import * as authController from './controllers/auth';
import cors from 'cors'
import AppError from './utils/appError';
import dotenv from 'dotenv';
import globalErrorHandler from './controllers/errorController'
import corsOptions from './config/corsOptions';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

// define environment variables
const envPath = process.env.NODE_ENV === 'production' ? './config.production.env' : './config.env'
dotenv.config({ path: envPath });

// define the app
console.info(`Using environment: ${process.env.NODE_ENV}`)
const app = express();


// middleware
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json())
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())
if (process.env.NODE_ENV !== 'production') app.use(logger('dev'))

// connect to the database
mongoose.connect(process.env.DB_STRING).then(() => {
  console.info('Connected to the database');
})

// routes
app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/recipes/', authController.protect, recipeRoutes)

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

app.use(globalErrorHandler)
const port = process.env.BACKEND_PORT
const server = app.listen(port, () => {
  console.info(`localhost:${port}`);
});
server.on('error', console.error);

