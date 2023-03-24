import { AdminRepository } from '../repositories';

type AdminServiceConfig = {
  adminRepository: AdminRepository;
};

export class AdminService {
  private readonly adminRepository: AdminRepository;

  constructor(config: AdminServiceConfig) {
    this.adminRepository = config.adminRepository;
  }

  async getBestProfession(start: Date, end: Date) {
    return this.adminRepository.getBestProfession(start, end);
  }

  async getBestClients(start: Date, end: Date, limit: number) {
    return this.adminRepository.getBestClients(start, end, limit);
  }
}
