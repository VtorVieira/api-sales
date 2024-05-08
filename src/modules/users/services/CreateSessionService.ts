import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserRespository from '../typeorm/repositories/UsersRespository';
import User from '../typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRespository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or Passwor invalid.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Email or Passwor invalid.', 401);
    }

    return user;
  }
}
