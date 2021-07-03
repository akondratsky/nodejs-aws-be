import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy, trySafe } from '@libs/lambda';
import schema from './schema';
import AWS from 'aws-sdk';

import { logger } from '@services/logger';

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<never> = async (event) => {
  logger.debug(`importProductsFile got event: ${JSON.stringify(event)}`);

  const { queryStringParameters: { name } } = event;

  logger.debug(`Get upload URL for file requested: "${name}"`);

  const s3 = new AWS.S3({
    region: 'us-east-1',
    signatureVersion: 'v4'
  });

  const url = await trySafe(() => s3.getSignedUrlPromise('putObject', {
    Bucket: 'bwn-csv-files2',
    Key: `uploaded/${name}`,
    Expires: 60,
  }));

  logger.debug(`Got URL for file upload: ${JSON.stringify(url)}`);

  return formatJSONResponse(url);
}

export const main = middyfy(importProductsFile, schema);
