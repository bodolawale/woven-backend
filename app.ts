import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import './src/libs/sequelize';

import ProfileRoutes from './src/profile/route';
import ContractRoutes from './src/contract/route';
import JobRoutes from './src/job/route';

const app = express();
app.use(express.json());

app.use('/api/profiles', ProfileRoutes);
app.use('/api/contracts', ContractRoutes);
app.use('/api/jobs', JobRoutes);

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(400).send({
    message: 'An error occurred while processing this request',
    data: err.toString(),
    stackTrace: err.stack
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
