import { handlerPath } from '@libs/handlerResolver';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        authorizer: {
          type: 'request',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          managedExternally: false,
          arn: 'arn:aws:cognito-idp:us-east-1:445393499671:userpool/us-east-1_ySYZH3V0R',
          name: 'cognitoCustomAuthorizer',
        }
      }
    }
  ]
};
