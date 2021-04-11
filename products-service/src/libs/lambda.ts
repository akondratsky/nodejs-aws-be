import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import validator from '@middy/validator';
import httpError from 'http-errors';
import { logger } from "@services/logger";

export const middyfy = (handler, inputSchema?) => {
  const middyfied = middy(handler);
  
  if (inputSchema) {
    middyfied.use(validator({ inputSchema }));
  }

  middyfied.use(middyJsonBodyParser())
    .use(httpErrorHandler())
    .use(cors());
  
  return middyfied;
};

/** If call of function will throw error, the HTTP status 500 will be returned */
export const trySafe = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    logger.error(e)
    throw httpError(500, STATUS_500_ERROR_MESSAGE);
  }
}

export const STATUS_500_ERROR_MESSAGE = 'Ooops... Something went wrong';
