import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';

// import deletePassword, {
//   IUserWithoutPassword,
// } from '@shared/utils/deletePassword';
import { inject, injectable } from 'tsyringe';
// import User from '../infra/typeorm/entities/User';
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

    await this.maiilProvider.sendMail(
      email,
      `Pedido de recuperação de senha ${token}`,
    );
  }
}

export default SendForgotPassowrdEmailService;
