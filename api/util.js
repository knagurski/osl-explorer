const { AssertionError } = require('assert');

const getResponse = (body, statusCode, headers = {}) => ({
  statusCode,
  body,
  headers,
});

const getJSONResponse = (body, statusCode = 200) =>
  getResponse(JSON.stringify(body), statusCode, {
    "Content-Type": "application/json",
  });

const getMethodNotAllowedResponse = () =>
  getResponse("Method Not Allowed", 405);

const getInternalServerErrorResponse = () =>
  getResponse("Internal Server Error", 500);

const getNotFoundResponse = () => getResponse("Not Found", 404);

const getDuplicateResponse = () => getResponse('Library already exists', 409);

const trimId = id => id.replace(/(\/index)?\.html?$/, "");

const handleError = e => {
  if (e instanceof AssertionError) return getMethodNotAllowedResponse();

  if (e.name === 'MongoError') {
    if (e.errmsg.includes('duplicate key')) return getDuplicateResponse();
  }

  console.error(e);
  return getInternalServerErrorResponse();
};

module.exports = {
  getResponse,
  getJSONResponse,
  getMethodNotAllowedResponse,
  getInternalServerErrorResponse,
  getNotFoundResponse,
  trimId,
  handleError
};
