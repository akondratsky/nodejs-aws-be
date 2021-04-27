import { getDbClient } from '@services/database';
import { logger } from '@services/logger';

interface Product {
    id: string,
    title: string,
    description: string,
    price: number,
    count: number
}


export const getAllProducts = async () => {
    let allProducts: Product[];
    const client = await getDbClient();
    
    try {
        logger.debug('Connecting to database');
        await client.connect();
        logger.debug(`Running getAllProducts query`);
        const { rows } = await client.query(`
            SELECT id, title, description, price, count, thumbnail FROM "products"
            INNER JOIN "stocks" ON id = product_id
        `);
        allProducts = rows;
    } finally {
        await client.end();
    }

    return allProducts;
};


export const getProductById = async (productId: string) => {
    const client = await getDbClient();
    let product: Product;

    try {
        logger.debug('Connecting to database');
        await client.connect();
        logger.debug('Running getProductById query');

        const { rows } = await client.query(`
            SELECT id, title, description, price, count, thumbnail FROM "products"
                INNER JOIN "stocks" ON id = product_id 
                WHERE id = '${productId}'
                limit 1
        `);

        product = rows.length ? rows[0] : null;
    } finally {
        client.end()
    }

    return product;
};
