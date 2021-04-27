import { handlerPath } from '@libs/handlerResolver';

export const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true
      }
    }
  ]
};
