import { AdminRepository } from './../repositories';

type config = {
  adminRepository: AdminRepository;
};

export class AdminService {
  private readonly adminRepository: AdminRepository;
  constructor(config: config) {
    this.adminRepository = config.adminRepository;
  }
  async getBestProfession(start: Date, end: Date) {
    return this.adminRepository.getBestProfession(start, end);
  }

  async getBestClients(start: Date, end: Date, limit: number) {
    return this.adminRepository.getBestClients(start, end, limit);
  }
}
