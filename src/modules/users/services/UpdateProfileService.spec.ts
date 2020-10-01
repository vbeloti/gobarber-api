import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'other_name',
      email: 'other_email@mail.com',
    });

    expect(updatedUser.name).toBe('other_name');
    expect(updatedUser.email).toBe('other_email@mail.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'any_name_non_existing',
        email: 'any_email@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'other_email@mail.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'any_name',
        email: 'any_email@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'other_name',
      email: 'other_email@mail.com',
      old_password: 'any_password',
      password: 'updated_password',
    });

    expect(updatedUser.password).toBe('updated_password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'other_name',
        email: 'other_email@mail.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'other_name',
        email: 'other_email@mail.com',
        password: 'other_password',
        old_password: 'wrong_old_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
