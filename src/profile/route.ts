import express from 'express';
import ProfileController from './controllers';

const router = express.Router({ mergeParams: true });

router.get('/:id', ProfileController.getProfileById);

export default router;
