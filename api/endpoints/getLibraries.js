const assert = require("assert");
const { getJSONResponse, handleError } = require("../util");
const { getLibraries } = require("../explorer");

exports.handler = async ({ httpMethod }) => {
  try {
    assert.strictEqual(httpMethod, "GET");

    return getJSONResponse(await getLibraries());
  } catch (e) {
    return handleError(e);
  }
};
