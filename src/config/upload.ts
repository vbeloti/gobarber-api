import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export const uploadsFolder = path.resolve(
  __dirname,
  '..',
  '..',
  'tmp',
  'uploads',
);

export default {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return cb(null, fileName);
    },
  }),
};
