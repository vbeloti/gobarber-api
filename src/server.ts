import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';

import './database';
import { tmpFolder } from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(tmpFolder));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🔥 Server started 🔥');
});
