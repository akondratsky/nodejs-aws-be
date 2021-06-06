import { handlerPath } from '@libs/handlerResolver';
import { AWS } from '@serverless/typescript';

export const importProductsFile: AWS['functions'][keyof AWS['functions']] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          resultTtlInSeconds: 0,
          name: 'requestEnvUserAuthorizer',
          identitySource: 'method.request.header.Authorization',
          type: 'request',
          managedExternally: false,
          arn: 'arn:aws:lambda:us-east-1:445393499671:function:authorization2-dev-basicAuthorizer'
        }
      }
    }
  ]
};
