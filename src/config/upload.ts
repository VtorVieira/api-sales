import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFoder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFoder,
  storage: multer.diskStorage({
    destination: uploadFoder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    }
  })
};
