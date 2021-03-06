import { JSONSchema7 } from 'json-schema';

export default {
  type: 'object',
  required: ['pathParameters'],
  properties: {
    pathParameters: {
      type: 'object',
      required: ['productId'],
      properties: {
        productId: {
          type: 'string',
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$'
        }
      }
    }
  }
} as JSONSchema7;
