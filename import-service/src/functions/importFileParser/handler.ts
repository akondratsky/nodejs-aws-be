import AWS from 'aws-sdk';
import csv from 'csv-parser';
import { middyfy } from '@libs/lambda';

import { logger } from '@services/logger';
import { IMPORT_FILE_BUCKET } from '@services/constants';

import type { S3CreateEvent } from 'aws-lambda';
import { ProductField } from '@entities/Product';


export const importFileParser = async (event: S3CreateEvent) => {
  logger.debug(`ImportFileParser invoced, number of files: ${event.Records.length}`);

  const s3 = new AWS.S3({
    region: 'us-east-1',
    signatureVersion: 'v4'
  });
  const sqs = new AWS.SQS({
    region: 'us-east-1'
  });

  event.Records.forEach(({ s3: { object } }) => {
    s3.getObject({
      Key: object.key,
      Bucket: IMPORT_FILE_BUCKET
    })
      .createReadStream()
      .pipe(csv({
        mapHeaders: ({ header }) => header.toLowerCase(),
        mapValues: ({ header, value }) => {
          switch (header?.toLowerCase() as ProductField) {
            case 'price':
            case 'count':
              return parseInt(value);
            default:
              return value;
          }
        }
      }))
      .on('data', (product) => {
        logger.debug(`Sending product to URL: ${process.env.SQS_URL}`)
        sqs.sendMessage({
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(product)
        }, () => {
          logger.debug('Message sent to SQS' + JSON.stringify(product));
        });
      })
      .on('end', async () => {
        logger.debug('Parsing successfully completed, copying file');

        const destinationKey = object.key.replace(/^uploaded/, 'parsed');

        logger.debug(`Copy from ${object.key} to ${destinationKey}`);

        await s3.copyObject({
          Bucket: IMPORT_FILE_BUCKET,
          Key: destinationKey,
          CopySource: `${IMPORT_FILE_BUCKET}/${object.key}`
        }).promise();

        logger.debug('File copied, deleting source from "uploaded/" folder');

        await s3.deleteObject({
          Bucket: IMPORT_FILE_BUCKET,
          Key: object.key
        }).promise();

        logger.debug('File deleted');
      })
      .on('error', (error) => {
        logger.error(error);
      });
  });
};



export const main = middyfy(importFileParser);
