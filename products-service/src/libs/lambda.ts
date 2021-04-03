import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';
import validator from '@middy/validator';

export const middyfy = (handler, inputSchema?) => {
  const middyfied = middy(handler);
  
  if (inputSchema) {
    middyfied.use(validator({ inputSchema }));
  }

  middyfied.use(middyJsonBodyParser())
    .use(httpErrorHandler())
    .use(cors());
  
  return middyfied;
}
