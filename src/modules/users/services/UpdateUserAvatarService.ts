import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import UserRespository from '../typeorm/repositories/UsersRespository';
import User from '../typeorm/entities/User';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFileName?: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRespository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    user.avatar = avatarFileName ?? '';

    await usersRepository.save(user);

    return user;
  }
}
