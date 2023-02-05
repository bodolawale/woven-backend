import models from '../../libs/sequelize';

const { profile: Profile } = models;
export class ProfileRepository {
  async getById(id: number) {
    return Profile.findOne({ where: { id } });
  }
}
