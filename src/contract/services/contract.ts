import { ContractRepository } from '../repositories';

type ContractServiceConfig = {
  contractRepository: ContractRepository;
};

export class ContractService {
  private readonly contractRepository: ContractRepository;

  constructor(config: ContractServiceConfig) {
    this.contractRepository = config.contractRepository;
  }

  async getCallerContractById(id: number, callerId: number) {
    return this.contractRepository.getCallerContractById(id, callerId);
  }

  async getContracts(callerId: number) {
    return this.contractRepository.getContracts(callerId);
  }
}
