import { AuthenticatedRequest } from './../../utils/types';
import { JobService } from '../services/job';
import { JobRepository } from '../repositories/job';
import { Response } from 'express';

const jobRepository = new JobRepository();
const jobService = new JobService({ jobRepository });

export async function getUnpaidJobs(req: AuthenticatedRequest, res: Response) {
  const callerId = req.user.id;
  const data = await jobService.getUnpaidJobs(callerId);

  return res.status(200).send({ message: 'Jobs fetched successfully', data });
}
