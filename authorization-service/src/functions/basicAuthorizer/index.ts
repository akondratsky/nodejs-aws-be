import { handlerPath } from '@libs/handlerResolver';

export const basicAuthorizer = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  // events: [
  //   {
  //     http: {
  //       method: 'post',
  //       path: 'products',
  //       cors: true
  //     }
  //   }
  // ]
};
