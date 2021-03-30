import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import * as productsService from '@services/products';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<never> = async () => {
    const result = await productsService.getProductById('assa!');
    return formatJSONResponse(result);
}

export const main = middyfy(getProductsById);
