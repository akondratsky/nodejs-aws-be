import { handlerPath } from '@libs/handlerResolver';

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [{
    s3: {
      bucket: 'bwn-csv-files2',
      existing: true,
      event: 's3:ObjectCreated:*',
      rules: [{
        prefix: 'uploaded/'
      }]
    }
  }]
};


