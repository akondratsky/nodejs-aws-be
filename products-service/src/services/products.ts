import { getDbClient } from '@services/database';
import { logger } from '@services/logger';
import { Product } from '@entities/Product';


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

export const createProduct = async ({ title, description, price, count }: Product): Promise<string> => {
    const client = await getDbClient();
    let productId: string;
    try {
        logger.debug('Connecting to database');
        await client.connect();
        await client.query('BEGIN');
        logger.debug('Creating new product');
        const { rows } = await client.query<Product>(`
            INSERT INTO "products" (title, description, price) VALUES
                ($1, $2, $3)
                RETURNING id
        `, [title, description, price]);
        productId = rows[0].id;
        await client.query(`
            INSERT INTO "stocks" (product_id, count) VALUES ($1, $2)
        `, [productId, count]);
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.end();
    }

    return productId;
}