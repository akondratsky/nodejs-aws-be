import type { S3CreateEvent } from 'aws-lambda';
// import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
// import AWS from 'aws-sdk';

import { logger } from '@services/logger';

export const importFileParser  = async (event: S3CreateEvent) => {
    logger.debug(`File was uploaded, records.length: ${event.Records.length}`);

    // const s3 = new AWS.S3({
    //     region: 'us-west-1'
    // });

    // return formatJSONResponse(url);
}

export const main = middyfy(importFileParser);
