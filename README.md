# nodejs-aws-be

## Details

- `npm run swagger` - runs swagger at [http://localhost:5001](http://localhost:5001/)
- `npm run deploy` - deploy lambdas
- `npm run test` - run unit tests

## What was done

- getProductsById endpoint, [example link](https://2o4c9nhcai.execute-api.us-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa)
- getProductsList, [example link](https://2o4c9nhcai.execute-api.us-west-1.amazonaws.com/dev/products)
- Front-end application integrated with these endpoints: [https://dkq2n3n0un0l0.cloudfront.net/](https://dkq2n3n0un0l0.cloudfront.net/)


## Additional scope
- Async/await is used in lambda functions
- ES6 modules are used for product-service implementation
- Webpack is configured for product-service
- SWAGGER documentation is created for product-service (`npm run swagger`, then [http://localhost:5001](http://localhost:5001))
- Lambda handlers are covered by basic UNIT tests
- Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
- Main error scenarious are handled by API (404 "not found" error, common 500 error for cases of unexpected exceptions and 400 for invalid parametes)

## Related PRs

- [Front-end merge request](https://github.com/akondratsky/nodejs-aws-fe/pull/3)

## Swagger

- Available [online](https://editor.swagger.io/?url=https://raw.githubusercontent.com/akondratsky/nodejs-aws-be/f0965a22745eb9e4aa3a6f3e850a9ef76cc8a789/products-service/swagger.yaml)
- Also available locally (`npm run swagger`, then [http://localhost:5001](http://localhost:5001))

