const formatResponse = (statusCode, body) => ({
    statusCode,
    body
});
  
exports.success = (data) =>
    formatResponse(200, data);

exports.error = (data) =>
    formatResponse(code, data);