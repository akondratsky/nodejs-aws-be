const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const { readFileSync } = require('fs');

const swaggerDocument = YAML.parse(readFileSync('./swagger.yaml', 'utf-8'));

express().use('/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
).listen(5001, () => {
  console.log('Swagger listen on 5001');
});