import { AWS } from '@serverless/typescript';
import dotenv from 'dotenv';
import { importProductsFile } from '@functions/importProductsFile'
import { importFileParser } from '@functions/importFileParser';

dotenv.config();

console.log(`Debug level logs enabled: ${process.env.ENV_DEBUG || 'false'}`);

const serverlessConfiguration: AWS = {
  service: 'import1',
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
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: 's3:*',
      Resource: [
        'arn:aws:s3:::bwn-csv-files2/*',
        'arn:aws:s3:::bwn-csv-files2'
      ]
    }],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ENV_DEBUG: process.env.ENV_DEBUG || 'false',  // I got strange issue: ${opts:} didn't work here!
      // PG_HOST: process.env.PG_HOST,
      // PG_PORT: process.env.PG_PORT,
      // PG_DATABASE: process.env.PG_DATABASE,
      // PG_USERNAME: process.env.PG_USERNAME,
      // PG_PASSWORD: process.env.PG_PASSWORD
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    importProductsFile,
    importFileParser
  },
};

module.exports = serverlessConfiguration;
