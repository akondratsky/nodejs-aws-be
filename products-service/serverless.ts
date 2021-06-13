import { AWS } from '@serverless/typescript';
import { getProductById } from '@functions/getProductById';
import { getProductsList } from '@functions/getProductsList';
import { createProduct } from '@functions/createProduct';
import dotenv from 'dotenv';

dotenv.config();

console.log(`Debug level logs enabled: ${process.env.ENV_DEBUG || 'false'}`);

const serverlessConfiguration: AWS = {
  service: 'products1',
  frameworkVersion: '2',
  useDotenv: true,
  custom: {
    serverlessOffline: {
      httpPort: 2007
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${opts:stage, \'dev\'}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ENV_DEBUG: process.env.ENV_DEBUG || 'false',  // I got strange issue: ${opts:} didn't work here!
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASSWORD
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
          },
          ResponseType: 'DEFAULT_4XX',
          StatusCode: '401',
          RestApiId: '3r9wrj0gbk',
        }
      },
    }
  },
  functions: {
    getProductById,
    getProductsList,
    createProduct
  },
};

module.exports = serverlessConfiguration;
