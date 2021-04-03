import { main as handler } from './handler';

import mockEvent from '@serverless/event-mocks';

import { getProductById } from '@services/products';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

jest.mock('@services/products');

const getProductByIdMock = getProductById as unknown as jest.Mock<() => any>;

describe('getProductsById', () => {
    afterEach(jest.clearAllMocks);

    it('returns error if ID is not GUID', async () => {
        const stubId = '42';
        getProductByIdMock.mockReturnValue(12345 as any);
        const event = mockEvent(
            'aws:apiGateway',
            {
                pathParameters: {
                    productId: stubId
                }
            } as unknown as APIGatewayProxyEvent
        );
        const result: any = await handler(event, {} as Context, undefined);

        expect(getProductByIdMock).not.toHaveBeenCalledWith(stubId);
        expect(result.body).toBe('Event object failed validation');
        expect(result.statusCode).toBe(400);
    });
    it('gets product by id, productId is taken from path', async () => {
        const stubId = 'b0cb3178-a08f-43e4-b7f2-313c5aa98a16';
        getProductByIdMock.mockReturnValue(12345 as any);
        const event = mockEvent(
            'aws:apiGateway',
            {
                pathParameters: {
                    productId: stubId
                }
            } as unknown as APIGatewayProxyEvent
        );
        const result: any = await handler(event, {} as Context, undefined);

        expect(getProductByIdMock).toHaveBeenCalledWith(stubId);
        expect(result.body).toBe('12345');
        expect(result.statusCode).toBe(200);
    });

    it('returns 404 with message in body if product not found', async () => {
        getProductByIdMock.mockReturnValue(null);
        const event = mockEvent(
            'aws:apiGateway',
            {
                pathParameters: {
                    productId: 'b0cb3178-a08f-43e4-b7f2-313c5aa98a16'
                }
            } as unknown as APIGatewayProxyEvent
        );

        const result: any = await handler(event, {} as Context, undefined);

        expect(result.body).toBe('Product with ID b0cb3178-a08f-43e4-b7f2-313c5aa98a16 does not exist');
        expect(result.statusCode).toBe(404);
    });
});
