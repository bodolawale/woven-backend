import models from '../../libs/sequelize';

const { profile: Profile } = models;

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
    return Profile.findOne({ where: { id } });
  }
}
