import SessionUserService from '@modules/users/services/SessionUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const sessionUser = container.resolve(SessionUserService);

    const { user, token } = await sessionUser.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
