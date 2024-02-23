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

dotenv.config({ path: './config.env' });

// import corsOptions from './config/corsOptions'

// define the app
console.info(`Using environment: ${process.env.NODE_ENV}`)
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json())

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

// connect to the database
mongoose.connect(process.env.DB_STRING).then(() => {
  console.info('Connected to the database');
})

// routes
app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/recipes/', authController.protect, recipeRoutes)

// get the status of the API
app.get('/', (req, res, next) => {
  console.log('hostname', req.hostname)
  console.log('originalUrl', req.originalUrl)
  console.log('origin', req.get('origin'))
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

