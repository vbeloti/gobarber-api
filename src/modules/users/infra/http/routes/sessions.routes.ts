import { Router } from 'express';
import SessionUserService from '@modules/users/services/SessionUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();

  const sessionUser = new SessionUserService(usersRepository);

  const { user, token } = await sessionUser.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
