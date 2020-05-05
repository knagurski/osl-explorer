const assert = require("assert");
const {
  getJSONResponse,
  trimId,
  getNotFoundResponse,
  handleError,
} = require("./util");
const { updateLibrary, getLibraryById } = require("./explorer");

exports.handler = async ({
  httpMethod,
  body,
  queryStringParameters: { id = "" },
}) => {
  try {
    assert.strictEqual(httpMethod, "PUT");

    const trimmedId = trimId(id);

    const success = await updateLibrary(trimmedId, JSON.parse(body));
    if (!success) return getNotFoundResponse();

    return getJSONResponse(await getLibraryById(trimmedId));
  } catch (e) {
    return handleError(e);
  }
};
