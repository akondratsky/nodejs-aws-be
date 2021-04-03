import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy, trySafe } from '@libs/lambda';

import * as productsService from '@services/products';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<never> = async () => {
    const result = await trySafe(() => productsService.getAllProducts());
    return formatJSONResponse(result);
}

export const main = middyfy(getProductsList);
