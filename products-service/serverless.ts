import { AWS } from '@serverless/typescript';
import { getProductById } from '@functions/getProductById';
import { getProductsList } from '@functions/getProductsList';


console.log(`Debug level logs enabled: ${process.env.ENV_DEBUG || 'false'}`);


const serverlessConfiguration: AWS = {
  service: 'products-service',
  frameworkVersion: '2',
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
    region: 'us-west-1',
    stage: '${opts:stage, \'dev\'}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ENV_DEBUG: process.env.ENV_DEBUG || 'false',  // I got strange issue: ${opts:} didn't work here!
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    getProductById,
    getProductsList
  },
};

module.exports = serverlessConfiguration;
