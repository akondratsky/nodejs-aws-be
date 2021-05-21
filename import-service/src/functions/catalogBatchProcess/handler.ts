import { middyfy } from '@libs/lambda';
import { logger } from '@services/logger';
import { createProduct } from '@services/products';
import schema from './schema';

export const catalogBatchProcess = async ({ Records }) => {
  for (let i = 0; i < Records.length; i++) {
    try {
      const product = JSON.parse(Records[i].body);
      await createProduct(product);
      logger.debug('Product created.');
    } catch (e) {
      logger.error(e);
    }
  }
}

export const main = middyfy(catalogBatchProcess, schema);
