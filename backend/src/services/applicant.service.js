const { applicantModel } = require("../models");

async function searchApplicant({
  // Query
  code,
  firstname,
  lastname,
  professionalschool,
  minimumscore,
  maximumscore,
  // Sort
  sortby = 'lastname',
  sortorder = 'asc',
  // Pagination
  limit = 25,
  page = 1
}) {
  try {
    // Query
    const query = {};
    if (code) {
      query.CODIGO = code
    }
    if (firstname) {
      query.NOMBRES = { $regex: new RegExp(firstname, 'i') };
    }
    if (lastname) {
      query.APELLIDOS = { $regex: new RegExp(lastname, 'i') };
    }
    if (professionalschool) {
      query.ESCUELA_PROFESIONAL = { $regex: new RegExp(professionalschool, 'i') };
    }
    if (minimumscore !== undefined && maximumscore !== undefined) {
      query.PUNTAJE = { $gte: parseFloat(minimumscore), $lte: parseFloat(maximumscore) };
    } else if (minimumscore !== undefined) {
      query.PUNTAJE = { $gte: parseFloat(minimumscore) };
    } else if (maximumscore !== undefined) {
      query.PUNTAJE = { $lte: parseFloat(maximumscore) };
    }
    // Sort
    let sort = {};
    if (sortby === 'firstname') {
      sort = { NOMBRES: sortorder === 'asc' ? 1 : -1 };
    } else if (sortby === 'lastname') {
      sort = { APELLIDOS: sortorder === 'asc' ? 1 : -1 };
    } else if (sortby === 'score') {
      sort = { PUNTAJE: sortorder === 'asc' ? 1 : -1 };
    } else if (sortby === 'merit') {
      sort = { MERITO: sortorder === 'asc' ? 1 : -1 };
    }
    // Pagination
    const skip = (page - 1) * limit;
    const applicants = await applicantModel.find(query).sort(sort).skip(skip).limit(limit).lean();
    const totalApplicantsCount = await applicantModel.countDocuments(query);
    const totalPages = Math.ceil(totalApplicantsCount / limit);
    return { applicants, totalPages };
  } catch (error) {
    console.log("[searchApplicant] Error(MONGO):", error)
    return { applicants: [], totalPages: 0 };
  }
};

module.exports = {
  searchApplicant,
};