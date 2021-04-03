import { main as handler } from './handler';

import mockEvent from '@serverless/event-mocks';

import { getAllProducts } from '@services/products';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { STATUS_500_ERROR_MESSAGE } from '@libs/lambda';

jest.mock('@services/products');

const getAllProductsMock = getAllProducts as unknown as jest.Mock<() => any>;

describe('getProductsById', () => {
    afterEach(jest.clearAllMocks);

    const createEventStub = () => mockEvent(
        'aws:apiGateway',
        {} as APIGatewayProxyEvent
    );

    it('gets list of all products', async () => {
        getAllProductsMock.mockImplementation(() => [42] as any);

        const event = createEventStub();
        const result: any = await handler(event, {} as Context, undefined);

        expect(getAllProductsMock).toHaveBeenCalled();
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual('[42]');
    });

    it('return 500 status if service raise error', async () => {
        getAllProductsMock.mockImplementation(() => {
            throw new Error('Let here be EXTERMINATUS');
        });
        const result: any = await handler(createEventStub(), {} as Context, undefined);

        expect(result.statusCode).toBe(500);
        expect(result.body).toBe(STATUS_500_ERROR_MESSAGE);
    });
});
