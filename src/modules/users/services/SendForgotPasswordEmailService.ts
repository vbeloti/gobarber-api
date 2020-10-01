import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPassowrdEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private maiilProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private userTokensRepository: IUsersTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.maiilProvider.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPassowrdEmailService;
