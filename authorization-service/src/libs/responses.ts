export const formatJSONResponse = (response: unknown) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const unauthorizedResponse = () => {
  return {
    statusCode: 401,
    body: 'unauthorized',
  };
};
