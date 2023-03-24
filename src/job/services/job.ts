import { JobRepository } from '../repositories';

type JobServiceConfig = {
  jobRepository: JobRepository;
};

export class JobService {
  private readonly jobRepository: JobRepository;

  constructor(config: JobServiceConfig) {
    this.jobRepository = config.jobRepository;
  }

  async getUnpaidJobs(callerId: number) {
    return this.jobRepository.getUnpaidJobs(callerId);
  }

  async pay(jobId: number, callerId: number, amountToPay: number) {
    return this.jobRepository.pay(jobId, callerId, amountToPay);
  }
}
