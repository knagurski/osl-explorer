const assert = require("assert");
const { getJSONResponse, handleError } = require("./util");
const { createLibrary } = require("./explorer");

exports.handler = async ({ httpMethod, body }) => {
  try {
    assert.strictEqual(httpMethod, "POST");

    return getJSONResponse(await createLibrary(JSON.parse(body)), 201);
  } catch (e) {
    return handleError(e);
  }
};
