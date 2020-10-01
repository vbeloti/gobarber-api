import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('any_name');
    expect(profile.email).toBe('any_email@mail.com');
  });

  it('should be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non_existing_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
