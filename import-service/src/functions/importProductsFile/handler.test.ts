import { main as handler } from './handler';
import { Context } from 'aws-lambda';

import AWS from 'aws-sdk';
import AwsMock from 'aws-sdk-mock';



describe('importProductsFile handler', () => {
  it('retrieves signed URL for file upload', async () => {
    AwsMock.setSDKInstance(AWS);
    AwsMock.mock('S3', 'getSignedUrl', (action, options, callback) => {
      expect(action).toBe('putObject');
      callback(null, `http://${options.Key}`);
    });

    const event = {
      queryStringParameters: {
        name: 'test_name'
      }
    };

    const result: any = await handler(event, {} as Context, null);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe('"http://uploaded/test_name"');
  });
});
