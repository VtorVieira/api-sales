import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/errors/AppError';
import UserRespository from '../typeorm/repositories/UsersRespository';
import UserTokensRespository from '../typeorm/repositories/UserTokenRespository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRespository);
    const userTokenRepository = getCustomRepository(UserTokensRespository);
    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exist.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;

    const comparteDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), comparteDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

    await userTokenRepository.generate(user.id);

    console.log('Token');
  }
}
