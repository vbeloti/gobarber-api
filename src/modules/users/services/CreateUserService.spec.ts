import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreatUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
