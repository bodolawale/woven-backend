export class ProfileRepository {
  async getById(id: number) {
    return Promise.resolve(`Profile is ${id}`);
  }
}
