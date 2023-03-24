import { Response } from 'express';
import { AuthenticatedRequest } from '../../utils/types';
import { AdminService } from '../services';
import { AdminRepository } from '../repositories';

const adminRepository = new AdminRepository();
const adminService = new AdminService({ adminRepository });

export async function getBestProfession(req: AuthenticatedRequest, res: Response) {
  const startQuery = req.query.start;
  const endQuery = req.query.end;

  const start = new Date(startQuery as string);
  const end = new Date(endQuery as string);

  const data = await adminService.getBestProfession(start, end);

  return res.status(200).send({ message: 'Best profession fetched successfully', data });
}

export async function getBestClients(req: AuthenticatedRequest, res: Response) {
  const startQuery = req.query.start;
  const endQuery = req.query.end;
  const limitQuery = req.query.limit ?? 2;

  const start = new Date(startQuery as string);
  const end = new Date(endQuery as string);
  const limit = parseInt(limitQuery as string, 10);

  const data = await adminService.getBestClients(start, end, limit);

  return res.status(200).send({ message: 'Best clients successfully', data });
}
