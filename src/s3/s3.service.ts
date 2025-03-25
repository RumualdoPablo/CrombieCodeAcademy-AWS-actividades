import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION') ?? 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey:
          this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
      },
    });

    this.bucketName =
      this.configService.get<string>('AWS_S3_BUCKET_NAME') ?? '';
  }

  async uploadFile(file: Express.Multer.File) {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${file.originalname}`, // Unique filename
      Body: file.buffer, // File content
      ContentType: file.mimetype, // Correct MIME type
    };

    try {
      await this.s3.send(new PutObjectCommand(uploadParams));
      return { message: 'File uploaded successfully', key: uploadParams.Key };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
