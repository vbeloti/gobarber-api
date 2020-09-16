import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../../models/User';
import deletePassword, { IUserWithoutPassword } from './utils/deletePassword';
import auth from '../config/auth';
import AppError from '../errors/AppError';

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
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user: deletePassword(user), token };
  }
}

export default SessionUserService;
