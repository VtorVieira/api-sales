import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import path from 'path';
import UserRespository from '../typeorm/repositories/UsersRespository';
import UserTokensRespository from '../typeorm/repositories/UserTokenRespository';
import EtherealMail from '@config/mail/EtherealMail';
import { link } from 'joi';

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

    const { token } = await userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Sales] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    });
  }
}
