import { APIGatewayRequestAuthorizerEvent, CustomAuthorizerCallback, PolicyDocument, Statement } from 'aws-lambda';
import { logger } from '@services/logger';


export const basicAuthorizer = async (
  event: APIGatewayRequestAuthorizerEvent,
  context,
  cb: CustomAuthorizerCallback
) => {
  logger.debug(`Authorization lambda called. Event: ${JSON.stringify(event)}`);

  if (event.type !== 'REQUEST') {
    cb('Unauthorized');
    return
  }

  try {
    const encoded = event.headers['Authorization'].split(' ')[1];

    logger.debug(`Encoded token: ${encoded}`);

    const [login, pwd] = Buffer.from(encoded, 'base64').toString('utf-8').split(':');

    logger.debug(`logging in with ${login}:${pwd}`);

    if (!login || !pwd) {
      cb('Unauthorized');
      return;
    }

    const storedPwd = process.env[login];

    logger.debug(`Stored password for spies and diversionists: ${storedPwd}`);

    const policy = {
      principalId: '*',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn,
        } as Statement],
      } as PolicyDocument,
    };

    logger.debug(`Generated policy, sending: ${JSON.stringify(policy)}`)

    cb(null, policy);
    return;
  } catch (e) {
    cb('Unauthorized');
    return;
  }
}

export const main = basicAuthorizer;
