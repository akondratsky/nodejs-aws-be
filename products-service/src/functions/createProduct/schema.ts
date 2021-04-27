import { JSONSchema7 } from 'json-schema';

export default {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        id: {
          type: 'string',
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$'
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        price: {
          type: 'number',
          minimum: 0
        },
        count: {
          type: 'number',
          minimum: 0,
          default: 0
        }
      }
    }
  }
} as JSONSchema7;
