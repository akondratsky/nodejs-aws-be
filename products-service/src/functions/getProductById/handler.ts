import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy, trySafe } from '@libs/lambda';
import httpError from 'http-errors';
import schema from './schema';

import * as productsService from '@services/products';
import { logger } from '@services/logger';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<never> = async ({ pathParameters: { productId } }) => {
    logger.debug(`Product with ID ${productId} requested`);

    const result = await trySafe(() => productsService.getProductById(productId));
    logger.debug(`Found product: ${JSON.stringify(result)}`);

    if (!result) {
        throw new httpError.NotFound(`Product with ID ${productId} does not exist`);
    }

    return formatJSONResponse(result);
}

export const main = middyfy(getProductById, schema);
