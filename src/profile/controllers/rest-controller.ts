import { AuthenticatedRequest } from './../../utils/types';
import { ProfileService } from '../services/profile';
import { ProfileRepository } from '../repositories/profile';
import { Request, Response } from 'express';

const profileRepository = new ProfileRepository();
const profileService = new ProfileService({ profileRepository });

export async function getProfileById(req: Request, res: Response) {
  const requestId = req.params.id;
  const id = parseInt(requestId, 10);
  const data = await profileService.getProfileById(id);

  return res.status(200).send({ message: 'Profile fetched successfully', data });
}

export async function deposit(req: AuthenticatedRequest, res: Response) {
  const requestId = req.params.userId;
  const callerId = parseInt(requestId, 10);
  const { amountToDeposit } = req.body;
  const data = await profileService.deposit(callerId, amountToDeposit);

  return res.status(200).send({ message: 'Amount deposited successfully', data });
}
