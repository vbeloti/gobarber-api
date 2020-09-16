import { Router } from 'express';
import SessionUserService from '@modules/users/services/SessionUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const sessionUser = container.resolve(SessionUserService);

  const { user, token } = await sessionUser.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
