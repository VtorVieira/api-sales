import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserRespository from '../typeorm/repositories/UsersRespository';
import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRespository);
    const emailExists = await usersRepository.findByEmail(name);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      email,
      password
    });

    await usersRepository.save(user);

    return user;
  }
}
