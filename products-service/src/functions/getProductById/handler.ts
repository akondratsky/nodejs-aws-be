import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import httpError from 'http-errors';
import schema from './schema';

import * as productsService from '@services/products';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<never> = async ({ pathParameters: { productId } }) => {
    const result = await productsService.getProductById(productId);
    if (!result) {
        throw new httpError.NotFound(`Product with ID ${productId} does not exist`);
    }
    return formatJSONResponse(result);
}

export const main = middyfy(getProductById, schema);
