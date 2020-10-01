import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SessionUserService from './SessionUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let sessionUser: SessionUserService;
let createUser: CreateUserService;

describe('SessionUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    sessionUser = new SessionUserService(fakeUsersRepository, fakeHashProvider);

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const response = await sessionUser.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate with non existing user', async () => {
    await expect(
      sessionUser.execute({
        email: 'any_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      sessionUser.execute({
        email: 'any_email@mail.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
