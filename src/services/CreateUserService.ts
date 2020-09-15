import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import deletePassword, { IUserWithoutPassword } from './utils/deletePassword';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: Request): Promise<IUserWithoutPassword> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return deletePassword(user);
  }
}

export default CreateUserService;
