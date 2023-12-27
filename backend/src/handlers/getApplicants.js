const middy = require('@middy/core');
const { connectDatabase } = require('../database/config');
const { applicantService } = require('../services');
const { handleResponse } = require('../utils');
const { queryParams } = require('../middlewares');

const mongooseInit = async () => {
  await connectDatabase();
}

const mongooseStarted = mongooseInit();

const handler = async (event) => {
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
      maximumscore,
      // sort
      sortby,
      sortorder,
      // Pagination
      limit,
      page = 1,
    } = event.queryStringParameters || {};
    const data = await applicantService.searchApplicant(
      {
        code,
        firstname,
        lastname,
        professionalschool,
        minimumscore,
        maximumscore,
        sortby,
        sortorder,
        limit,
        page
      });
    if (data.applicants.length === 0) {
      return handleResponse.generateResponse(404, {
        success: true,
        message: 'Applicants not found',
        data: [],
        page: 0,
        totalPages: 0,
        count: 0,
      });
    }
    return handleResponse.generateResponse(200, {
      success: true,
      count: data.totalApplicantsCount,
      page: parseInt(page),
      totalpages: data.totalPages,
      data: data.applicants,
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

module.exports = {
  handler: middy(handler).use(queryParams.validate())
};