import dotenv = require('dotenv');
import * as AWS from 'aws-sdk';

dotenv.config();

export const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: process.env.AWS_S3_REGION,
});

export const bucketName = process.env.AWS_S3_BUCKET_NAME;
