import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import ProfileRoutes from './src/profile/route';

dotenv.config();

import './src/libs/sequelize';

const app = express();
app.use(express.json());

app.use('/api/profile', ProfileRoutes);

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(400).send({
    message: 'An error occurred while processing this request',
    data: err.toString()
  });
}

function error404(req: Request, res: Response, next: NextFunction) {
  res.status(404).send({
    success: false,
    message: 'Invalid URL'
  });
}

app.use(errorHandler);
app.use(error404);

export default app;
