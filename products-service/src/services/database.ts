import { Client, ClientConfig } from 'pg';

const options: ClientConfig = {
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  connectionTimeoutMillis: 3000
};

export const getDbClient = async () => {
  return new Client(options);
}
