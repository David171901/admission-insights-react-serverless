const generateResponse = (statusCode, body) => {
  const response = {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
  return response;
}

module.exports = {
  generateResponse,
};