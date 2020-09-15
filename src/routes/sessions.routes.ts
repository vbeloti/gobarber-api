import { Router } from 'express';
import SessionUserService from '../services/SessionUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const sessionUser = new SessionUserService();

    const { user, token } = await sessionUser.execute({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
