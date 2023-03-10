import { ProfileRepository } from './../repositories';

type config = {
  profileRepository: ProfileRepository;
};

export class ProfileService {
  private readonly profileRepository: ProfileRepository;
  constructor(config: config) {
    this.profileRepository = config.profileRepository;
  }
  async getProfileById(id: number) {
    return this.profileRepository.getById(id);
  }

  async deposit(callerId: number, amountToDeposit: number) {
    return this.profileRepository.deposit(callerId, amountToDeposit);
  }
}
