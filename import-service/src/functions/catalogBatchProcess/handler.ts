import { Product } from '@entities/Product';
import { middyfy } from '@libs/lambda';
import { logger } from '@services/logger';
import { createProduct } from '@services/products';
import AWS from 'aws-sdk';
import schema from './schema';

export const catalogBatchProcess = async ({ Records }) => {
  try {
    const sns = new AWS.SNS({
      apiVersion: 'latest',
    });

    for (let i = 0; i < Records.length; i++) {
      const product: Product = JSON.parse(Records[i].body);
      await createProduct(product);
      logger.debug('Product created.');

      await sns.publish({
        Message: `Product was added: ${product.title}`,
        TopicArn: process.env.CATALOG_ITEM_TOPIC_ARN
      }).promise();
    }

    if (!process.env.CATALOG_ITEM_TOPIC_ARN) {
      throw new Error('process.env.CATALOG_ITEM_TOPIC_ARN is empty');
    }

    console.log('Trying to send notification...')



    console.log('The End.')
  } catch (e) {
    logger.error(e);
  }

}

export const main = middyfy(catalogBatchProcess, schema);
