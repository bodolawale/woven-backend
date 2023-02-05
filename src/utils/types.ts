import { Request } from 'express';
import { ProfileData } from '../profile/repositories';

export type AuthenticatedRequest = Request & { user: ProfileData };
