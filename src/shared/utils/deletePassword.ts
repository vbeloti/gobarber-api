import User from '../../modules/users/entities/User';

export interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export default function deletePassword(user: User): IUserWithoutPassword {
  const userWithoutPassowrd: IUserWithoutPassword = { ...user };

  delete userWithoutPassowrd.password;

  return userWithoutPassowrd;
}
