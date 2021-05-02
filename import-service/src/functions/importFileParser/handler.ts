import AWS from 'aws-sdk';
import csv from 'csv-parser';
import { middyfy } from '@libs/lambda';

import { logger } from '@services/logger';
import { IMPORT_FILE_BUCKET } from '@services/constants';

import type { S3CreateEvent } from 'aws-lambda';
import { ProductField } from '@entities/Product';


export const importFileParser  = async (event: S3CreateEvent) => {
    logger.debug(`ImportFileParser invoced, number of files: ${event.Records.length}`);

    const s3 = new AWS.S3({
        region: 'us-east-1',
        signatureVersion: 'v4'
    });

    event.Records.forEach(({ s3: { object }}) => {
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
                // validate(product);
                logger.debug('importing product', { product });
            })
            .on('end', () => {
                logger.debug('Parsing successfully completed');
            })
            .on('error', (error) => {
                logger.error(error);
            });
    });
};

export const main = middyfy(importFileParser);
