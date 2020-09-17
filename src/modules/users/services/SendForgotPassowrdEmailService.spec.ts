import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPassowrdEmailService from './SendForgotPassowrdEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgorPasswordEmail = new SendForgotPassowrdEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    await sendForgorPasswordEmail.execute({
      email: 'any_email@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
