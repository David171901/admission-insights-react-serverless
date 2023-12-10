const { connectDatabase } = require('../database/config');
const { applicantService } = require('../services');
const { handleResponse } = require('../utils')

const mongooseInit = async () => {
  await connectDatabase();
}

const mongooseStarted = mongooseInit();

module.exports.handler = async (event) => {
  try {
    // Initialize database
    await mongooseStarted;
    // ***
    const {
      // query
      code,
      firstname,
      lastname,
      professionalschool,
      minimumscore,
      maximumscrore,
      // sort
      sortby,
      sortorder,
      // Pagination
      limit,
      page
    } = event.queryStringParameters;
    const applicants = await applicantService.searchApplicant(
      {
        code,
        firstname,
        lastname,
        professionalschool,
        minimumscore,
        maximumscrore,
        sortby,
        sortorder,
        limit,
        page
      });
    if (applicants.length === 0) {
      return handleResponse.generateResponse(404, {
        success: true,
        data: applicants,
      });
    }
    return handleResponse.generateResponse(200, {
      success: true,
      count: applicants.length,
      page: page,
      data: applicants,
    });
  } catch (error) {
    console.log('[getApplicants] Error(UNEXPECTED)', error.message);
    return handleResponse.generateResponse(500, {
      success: false,
      message: 'Error getting applicants',
      error: error.message
    });
  }
};
