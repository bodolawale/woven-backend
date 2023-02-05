import { CONTRACT_STATUSES } from './../consts';
import { Op } from 'sequelize';
import models from '../../libs/sequelize';
import { safeToJson } from '../../libs/sequelize-utils';

const { contract: Contract } = models;

export type ContractData = {
  id: number;
  status_id: number;
  client_id: number;
  contractor_id: number;
  created_at: Date;
  updated_at: Date;
};

export class ContractRepository {
  async getCallerContractById(id: number, callerId: number): Promise<ContractData> {
    const contractModel = await Contract.findOne({ where: { id, client_id: callerId } });
    const contract = safeToJson(contractModel);
    if (!contract) throw new Error(`contract with id ${id} not found`);
    return contract;
  }

  async getContracts(callerId: number): Promise<ContractData[]> {
    const contracts = await Contract.find({
      where: {
        [Op.or]: [{ client_id: callerId, contractor_id: callerId }],
        status_id: { [Op.ne]: CONTRACT_STATUSES.TERMINATED }
      }
    });

    return safeToJson(contracts);
  }
}
