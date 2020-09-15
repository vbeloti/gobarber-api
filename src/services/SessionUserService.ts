import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import deletePassword, { IUserWithoutPassword } from './utils/deletePassword';

interface IRequest {
  email: string;
  password: string;
}

interface Response {
  user: IUserWithoutPassword;
  token: string;
}

class SessionUserService {
  public async execute({ email, password }: IRequest): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, 'secret', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user: deletePassword(user), token };
  }
}

export default SessionUserService;
