import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy, trySafe } from '@libs/lambda';
import schema from './schema';
import { Product } from '@entities/Product';

import * as productsService from '@services/products';
import { logger } from '@services/logger';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<never> = async ({ body }) => {
    const product = body as Product;

    logger.debug('Creating product', product);
    const id = await trySafe(() => productsService.createProduct(product));

    return formatJSONResponse(id);
}

export const main = middyfy(createProduct, schema);
