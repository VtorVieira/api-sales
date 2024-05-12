import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserRespository from '../typeorm/repositories/UsersRespository';
import User from '../typeorm/entities/User';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRespository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or Passwor invalid.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Email or Passwor invalid.', 401);
    }

    const token = sign({}, '5393b611eb971108e2a6e470ca1679f7', {
      subject: user.id,
      expiresIn: '1d'
    });

    return { user, token };
  }
}
