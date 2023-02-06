import { CONTRACT_STATUSES } from './../../contract/consts';
import { safeToJson } from './../../libs/sequelize-utils';
import { Op } from 'sequelize';
import models from '../../libs/sequelize';

const { job: Job, contract: Contract, profile: Profile, payment_status: PaymentStatus } = models;

export type JobData = {
  id: number;
  payment_status_id: number;
  contract_id: number;
  amount: number;
  client_id: number;
  contractor_id: number;
};
export class JobRepository {
  async getUnpaidJobs(callerId: number): Promise<JobData[]> {
    const jobs = await Job.findAll({
      where: {
        [Op.or]: [{ client_id: callerId }, { contractor_id: callerId }]
      },
      include: [
        { model: PaymentStatus, as: 'payment_status' },
        { model: Profile, as: 'client' },
        { model: Profile, as: 'contractor' },
        { model: Contract, as: 'contract', where: { status_id: CONTRACT_STATUSES.IN_PROGRESS } }
      ]
    });
    return safeToJson(jobs);
  }
}
