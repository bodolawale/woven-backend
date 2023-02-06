import { safeToJson } from './../../libs/sequelize-utils';
import { Op } from 'sequelize';
import { PAYMENT_STATUS } from './../../job/consts';
import models from '../../libs/sequelize';
import { ProfileData } from '../../profile/repositories';
const { profile: Profile, job: Job, sequelize } = models;

export class AdminRepository {
  async getBestProfession(start: Date, end: Date): Promise<ProfileData | null> {
    const jobModels = await Job.findAll({
      where: { payment_status_id: PAYMENT_STATUS.PAID, created_at: { [Op.between]: [start, end] } },
      include: [{ model: Profile, as: 'contractor' }],
      attributes: [
        'contractor_id',
        [sequelize.fn('sum', sequelize.col('amount')), 'amount_earned']
      ],
      group: ['contractor_id'],
      order: [['amount_earned', 'DESC']],
      limit: 1
    });
    const jobs = safeToJson(jobModels);
    return jobs[0]?.contractor ?? null;
  }

  async getBestClients(start: Date, end: Date, limit: number): Promise<ProfileData[]> {
    const jobModels = await Job.findAll({
      where: { payment_status_id: PAYMENT_STATUS.PAID, created_at: { [Op.between]: [start, end] } },
      include: [{ model: Profile, as: 'client' }],
      attributes: ['client_id', [sequelize.fn('sum', sequelize.col('amount')), 'amount_earned']],
      group: ['client_id'],
      order: [['amount_earned', 'DESC']],
      limit
    });
    const jobs = safeToJson(jobModels);
    const clients = jobs.map(({ client }) => client);

    return clients;
  }
}
