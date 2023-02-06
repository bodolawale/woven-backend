import { PAYMENT_STATUS } from './../../job/consts';
import { safeToJson } from './../../libs/sequelize-utils';
import models from '../../libs/sequelize';

const { profile: Profile, job: Job, sequelize } = models;

export type ProfileData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_type_id: number;
  password_hash: string | null;
  balance: number;
  created_at: Date;
  updated_at: Date;
};
export class ProfileRepository {
  async getById(id: number): Promise<ProfileData | null> {
    const profile = Profile.findOne({ where: { id } });
    return safeToJson(profile);
  }

  async deposit(callerId: number, amountToDeposit: number): Promise<void> {
    const totalJobModels = await Job.findAll({
      where: { client_id: callerId, payment_status_id: PAYMENT_STATUS.UNPAID },
      attributes: ['client_id', [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']],
      group: ['client_id']
    });
    const totalJobs = safeToJson(totalJobModels);
    // to be fair, I don't understand the idea behind this requirement
    const totalJobAmount: number = parseInt(totalJobs[0]?.total_amount, 10) ?? 0;
    const percentageOfTotalJobs = (25 / 100) * totalJobAmount;

    if (amountToDeposit > percentageOfTotalJobs)
      throw new Error('Cannot deposit more than 25% of total jobs to be paid');

    await Profile.increment('balance', {
      by: amountToDeposit,
      where: { id: callerId }
    });
  }
}
