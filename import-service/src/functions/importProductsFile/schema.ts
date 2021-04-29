import { JSONSchema7 } from 'json-schema';

export default {
  type: 'object',
  required: ['queryStringParameters'],
  properties: {
    queryStringParameters: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string'
        }
      }
    }
  }
} as JSONSchema7;
