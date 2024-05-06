import { getCustomRepository } from 'typeorm';
import UserRespository from '../typeorm/repositories/UsersRespository';
import User from '../typeorm/entities/User';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRespository);
    const users = await usersRepository.find();

    return users;
  }
}
