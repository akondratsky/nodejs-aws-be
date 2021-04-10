import { handlerPath } from './handlerResolver';

describe('handlerPath', () => {
  afterAll(jest.resetAllMocks);

  it('converts __dirname to path, relative to working directory', () => {
    const dirnameStub = 'C:\\git\\nodejs-aws-be\\products-service\\src\\libs';
    const workingDirectoryStub = 'C:\\git\\nodejs-aws-be\\products-service';

    jest.spyOn(process, 'cwd').mockReturnValue(workingDirectoryStub);

    const result = handlerPath(dirnameStub);

    expect(result).toBe('src/libs');
  });
});
