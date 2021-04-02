import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productsService from '@services/products';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<never> = async () => {
    const result = await productsService.getAllProducts();
    return formatJSONResponse(result);
}

export const main = middyfy(getProductsList);
