const { querySchema } = require("../schemas/query.schema");
const { handleResponse } = require("../utils");

const validate = () => {
  return {
    before: (handler) => {
      const queries = handler.event.queryStringParameters || {};
      const result  = querySchema.safeParse(queries);
      if(!result.success) {
        return handleResponse.generateResponse(500, {
          success: false,
          message: 'Error in the query parameters sent',
          error: result.error,
        });
      }
    }
  };
};

module.exports = {
  validate,
};