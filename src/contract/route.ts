import express from 'express';
import ContractController from './controllers';
import { catchAsync } from '../utils/error-service';
import getProfile from '../middleware/get-profile';

const router = express.Router({ mergeParams: true });

router.get('/', getProfile, catchAsync(ContractController.getContracts));
router.get('/:id', getProfile, catchAsync(ContractController.getCallerContractById));

export default router;
