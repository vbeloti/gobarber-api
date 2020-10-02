import multer, { StorageEngine } from 'multer';
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

interface IUploadConfig {
  driver: 's3' | 'disk';
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
  tmpFolder: string;
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
