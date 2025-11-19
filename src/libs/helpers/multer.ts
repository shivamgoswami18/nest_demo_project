import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

export interface MulterConfig {
  destination?: string;
  fieldName?: string;
}

export const createFileUploadInterceptor = (config: MulterConfig = {}) => {
  const { destination, fieldName } = config;

  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination,
      filename: (req, file, callback) => {
        const ext = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${ext}`;
        callback(null, fileName);
      },
    }),
  });
};
