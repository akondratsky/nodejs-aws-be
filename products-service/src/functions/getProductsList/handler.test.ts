import { main as handler } from './handler';

import mockEvent from '@serverless/event-mocks';

import { getAllProducts } from '@services/products';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

jest.mock('@services/products');
jest.mock('@libs/apiGateway');

const getAllProductsMock = getAllProducts as unknown as jest.Mock<() => any>;

describe('getProductsById', () => {
    it('gets product by id, productId is taken from path', async () => {
        getAllProductsMock.mockReturnValue('test_value' as any);
        const event = mockEvent(
            'aws:apiGateway',
            {} as APIGatewayProxyEvent
        );
        const result = await handler(event, {} as Context, undefined);

        expect(getAllProductsMock).toHaveBeenCalled();
        expect(result).toEqual('test_value');
    });
});
