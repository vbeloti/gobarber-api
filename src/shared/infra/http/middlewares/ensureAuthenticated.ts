import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../../config/auth';

import AppError from '../../../errors/AppError';

interface ITokenPayload {
  iad: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 405);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = auth.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    // res.locals.user = {
    //   id: sub,
    // };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 405);
  }
}
