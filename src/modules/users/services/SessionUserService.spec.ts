import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SessionUserService from './SessionUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('SessionUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const sessionUser = new SessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const sessionUser = new SessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      sessionUser.execute({
        email: 'any_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const sessionUser = new SessionUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(
      sessionUser.execute({
        email: 'any_email@mail.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
