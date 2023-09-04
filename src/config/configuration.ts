import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => ({
  bucket: process.env.BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  acl: process.env.ACL,
  contentDisposition: process.env.CONTENT_DISPOSITION,
}));
