const assert = require("assert");
const {
  getResponse,
  trimId,
  getNotFoundResponse,
  handleError,
} = require("./util");
const { deleteLibrary } = require("./explorer");

exports.handler = async ({
  httpMethod,
  queryStringParameters: { id = "" },
}) => {
  try {
    assert.strictEqual(httpMethod, "DELETE");

    const success = await deleteLibrary(trimId(id));
    console.log(success);
    if (!success) return getNotFoundResponse();

    return getResponse("Library deleted", 200);
  } catch (e) {
    return handleError(e);
  }
};
