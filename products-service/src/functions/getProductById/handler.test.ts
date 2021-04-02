import { main as handler } from './handler';

import mockEvent from '@serverless/event-mocks';

import { getProductById } from '@services/products';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

jest.mock('@services/products');

const getProductByIdMock = getProductById as unknown as jest.Mock<() => any>;

describe('getProductsById', () => {
    afterEach(jest.clearAllMocks);

    it('gets product by id, productId is taken from path', async () => {
        getProductByIdMock.mockReturnValue(12345 as any);
        const event = mockEvent(
            'aws:apiGateway',
            {
                pathParameters: {
                    productId: 13
                }
            } as unknown as APIGatewayProxyEvent
        );
        const result: any = await handler(event, {} as Context, undefined);

        expect(getProductByIdMock).toHaveBeenCalledWith(13);
        expect(result.body).toBe('12345');
        expect(result.statusCode).toBe(200);
    });

    it('returns 404 with message in body if product not found', async () => {
        getProductByIdMock.mockReturnValue(null);
        const event = mockEvent(
            'aws:apiGateway',
            {
                pathParameters: {
                    productId: 42
                }
            } as unknown as APIGatewayProxyEvent
        );

        const result: any = await handler(event, {} as Context, undefined);

        expect(result.body).toBe('Product with ID 42 does not exist');
        expect(result.statusCode).toBe(404);
    });
});
