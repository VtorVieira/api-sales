import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserRespository from '../typeorm/repositories/UsersRespository';
import UserTokensRespository from '../typeorm/repositories/UserTokenRespository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRespository);
    const userTokenRepository = getCustomRepository(UserTokensRespository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const token = await userTokenRepository.generate(user.id);

    console.log('token', token);
  }
}
