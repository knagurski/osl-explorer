const assert = require("assert");
const {
  getJSONResponse,
  getNotFoundResponse,
  trimId,
  handleError,
} = require("./util");
const { getLibraryById } = require("./explorer");

exports.handler = async ({
  httpMethod,
  queryStringParameters: { id = "" },
}) => {
  try {
    assert.strictEqual(httpMethod, "GET");

    const library = await getLibraryById(trimId(id));

    if (!library) {
      return getNotFoundResponse();
    }

    return getJSONResponse(library);
  } catch (e) {
    return handleError(e);
  }
};
