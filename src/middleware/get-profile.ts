import { AuthenticatedRequest } from './../utils/types';
import { NextFunction, Response } from 'express';
import { ProfileRepository } from '../profile/repositories';

const profileRepository = new ProfileRepository();

const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const profileId = req.headers.profile_id as string;
  const id = parseInt(profileId, 10);
  const profile = await profileRepository.getById(id);
  if (!profile) throw new Error('Profile not found');
  req.user = profile;
  return next();
};

export default getProfile;
