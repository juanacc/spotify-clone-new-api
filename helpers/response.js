const formatResponse = (statusCode, body) => ({
    statusCode,
    body
});
  
exports.success = (data) =>
    formatResponse(200, data);

exports.error = (code, data) =>
    formatResponse(code, data);