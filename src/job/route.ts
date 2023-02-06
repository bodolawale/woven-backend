import express from 'express';
import JobController from './controllers';
import { catchAsync } from '../utils/error-service';
import getProfile from '../middleware/get-profile';

const router = express.Router({ mergeParams: true });

router.get('/unpaid', getProfile, catchAsync(JobController.getUnpaidJobs));
router.post('/:job_id/pay', getProfile, catchAsync(JobController.pay));

export default router;
