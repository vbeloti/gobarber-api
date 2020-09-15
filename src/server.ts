import express from 'express';
import routes from './routes';

import './database';
import { tmpFolder } from './config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(tmpFolder));
app.use(routes);

app.listen(3333, () => {
  console.log('🔥 Server started 🔥');
});
