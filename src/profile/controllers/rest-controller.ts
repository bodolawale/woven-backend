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
