import { Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';
import { config } from '../../config';
@Injectable()
export class FilesService {
  constructor(
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}
  private client = new S3Client({
    region: this.appConfig.region,
    credentials: {
      accessKeyId: this.appConfig.accessKeyId,
      secretAccessKey: this.appConfig.secretAccessKey,
    },
  });

  async uploadFiles(file: Express.Multer.File) {
    const { buffer, originalname, mimetype, ...data } = file;
    console.log({ originalname, mimetype, ...data });
    return await this.s3_upload(
      buffer,
      this.appConfig.bucket,
      originalname,
      mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: this.appConfig.acl,
      ContentType: mimetype,
      ContentDisposition: this.appConfig.contentDisposition,
    });
    try {
      return this.client.send(command);
    } catch (e) {
      console.log(e);
    }
  }
}
