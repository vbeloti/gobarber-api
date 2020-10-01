import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'any_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('any_id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'any_id',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'any_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
