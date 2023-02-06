import { PAYMENT_STATUS } from './../consts';
import { CONTRACT_STATUSES } from './../../contract/consts';
import { safeToJson } from './../../libs/sequelize-utils';
import { Op } from 'sequelize';
import models from '../../libs/sequelize';

const {
  job: Job,
  contract: Contract,
  profile: Profile,
  payment_status: PaymentStatus,
  sequelize
} = models;

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

  async pay(jobId: number, callerId: number, amountToPay: number): Promise<void> {
    await sequelize.transaction(async transaction => {
      const [client, job] = await Promise.all([
        Profile.findOne({
          where: { id: callerId },
          attributes: ['id', 'balance']
        }),
        Job.findOne({ where: { id: callerId } })
      ]);
      if (amountToPay > client.balance) throw new Error('Insufficient balance');
      if (amountToPay !== job.amount) throw new Error(`${job.amount} is meant to be paid`);

      // pay for job

      // 1. remove from client balance
      await Profile.decrement('balance', { by: amountToPay, where: { id: callerId }, transaction });
      // 2. add value to contractor
      await Profile.increment('balance', {
        by: amountToPay,
        where: { id: job.contractor_id },
        transaction
      });
      // 3. set job status to paid
      await Job.update(
        { payment_status_id: PAYMENT_STATUS.PAID },
        { where: { id: jobId }, transaction }
      );
    });
  }
}
