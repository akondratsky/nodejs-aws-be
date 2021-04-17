import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy, trySafe } from '@libs/lambda';

import * as productsService from '@services/products';
import { logger } from '@services/logger';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<never> = async () => {
    logger.debug('All products list requested');

    const result = await trySafe(() => productsService.getAllProducts());
    logger.debug(`Found ${result?.length} products`);

    return formatJSONResponse(result);
}

export const main = middyfy(getProductsList);
