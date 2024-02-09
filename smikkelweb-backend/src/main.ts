/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import cors from 'cors'
import express from 'express';
import * as path from 'path';
import userRouter from './routes/userRoutes'
import logger from 'morgan'

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
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to smikkelweb-backend!' });
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

app.use(errorController)

server.on('error', console.error);
