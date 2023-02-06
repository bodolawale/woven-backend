import express from 'express';
import AdminController from './controllers';
import { catchAsync } from '../utils/error-service';

const router = express.Router({ mergeParams: true });

router.get('/best-profession', catchAsync(AdminController.getBestProfession));
router.get('/best-clients', catchAsync(AdminController.getBestClients));

export default router;
