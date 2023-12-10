const { connectDatabase } = require('./src/database/config');

const mongooseInit = async () => {
  await connectDatabase();
}

const mongooseStarted = mongooseInit();

module.exports.handler = async (event) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log("🚀 ~ file: index.js:23 ~ module.exports.handler= ~ error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "An error has occurred",
        },
        null,
        2
      ),
    };
  }
};
