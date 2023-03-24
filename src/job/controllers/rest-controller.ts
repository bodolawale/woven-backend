import { Response } from 'express';
import { AuthenticatedRequest } from '../../utils/types';
import { JobService } from '../services/job';
import { JobRepository } from '../repositories/job';

const jobRepository = new JobRepository();
const jobService = new JobService({ jobRepository });

export async function getUnpaidJobs(req: AuthenticatedRequest, res: Response) {
  const callerId = req.user.id;
  const data = await jobService.getUnpaidJobs(callerId);

  return res.status(200).send({ message: 'Jobs fetched successfully', data });
}

export async function pay(req: AuthenticatedRequest, res: Response) {
  const callerId = req.user.id;
  const { amountToPay } = req.body;

  const requestId = req.params.job_id;
  const jobId = parseInt(requestId, 10);

  await jobService.pay(jobId, callerId, amountToPay);

  return res.status(200).send({ message: 'Payment made successfully' });
}
