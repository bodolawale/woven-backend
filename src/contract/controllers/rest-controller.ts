import { Response } from 'express';
import { AuthenticatedRequest } from '../../utils/types';
import { ContractService } from '../services/contract';
import { ContractRepository } from '../repositories/contract';

const contractRepository = new ContractRepository();
const contractService = new ContractService({ contractRepository });

export async function getCallerContractById(req: AuthenticatedRequest, res: Response) {
  const requestId = req.params.id;
  const id = parseInt(requestId, 10);
  const callerId = req.user.id;
  const data = await contractService.getCallerContractById(id, callerId);

  return res.status(200).send({ message: 'Contract fetched successfully', data });
}
export async function getContracts(req: AuthenticatedRequest, res: Response) {
  const callerId = req.user.id;
  const data = await contractService.getContracts(callerId);

  return res.status(200).send({ message: 'Contracts fetched successfully', data });
}
