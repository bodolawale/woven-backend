import express from 'express';
import ProfileController from './controllers';
import { catchAsync } from '../utils/error-service';

const router = express.Router({ mergeParams: true });

router.get('/:id', catchAsync(ProfileController.getProfileById));

export default router;
