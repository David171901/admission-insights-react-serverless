import { type Result, type ErrorTypes } from "../common/types";
import { Applicant } from '../interfaces/applicant';

type Applicants = Applicant[];

export type Response = {
  count: number,
  data: Applicants,
  page: number,
  success: boolean,
  totalpages: number,
}

type ApplicantResult = Result<Response, ErrorTypes>;

interface ResponseApplicant {
  _id: string,
  CODIGO: string,
  NOMBRES: string,
  APELLIDOS: string,
  ESCUELA_PROFESIONAL: string,
  PUNTAJE: number,
  MERITO: string | number,
  OBSERVACION: string,
  DETALLE_OBSERVACION: string,
}

const applicantAdapter = (applicant: ResponseApplicant): Applicant => {
  return {
    id: applicant._id,
    code: applicant.CODIGO,
    firstname: applicant.NOMBRES,
    lastname: applicant.APELLIDOS,
    professionalschool: applicant.ESCUELA_PROFESIONAL,
    score: applicant.PUNTAJE,
    merit: applicant.MERITO,
    observation: applicant.OBSERVACION,
    detail: applicant.DETALLE_OBSERVACION,
  }
}

type GetApplicantsOptions = {
  code?: string,
  firstname?: string,
  lastname?: string,
  professionalschool?: string,
  minimumscore?: string,
  maximumscore?: string,
  sortby?: string,
  sortorder?: string,
  limit?: string,
  page?: string,
}

export async function getApplicants(
  url: string,
  {
    code,
    firstname,
    lastname,
    maximumscore,
    minimumscore,
    professionalschool,
    sortby,
    sortorder,
    page,
    limit,
  }: GetApplicantsOptions
): Promise<ApplicantResult> {
  let finalUrl = `${url}/applicants?limit=${limit ?? 10
    }&page=${page ?? 1}`;
  if (code) finalUrl += `&code=${code}`;
  if (firstname) finalUrl += `&firstname=${firstname}`;
  if (lastname) finalUrl += `&lastname=${lastname}`;
  if (maximumscore) finalUrl += `&maximumscore=${maximumscore}`;
  if (minimumscore) finalUrl += `&minimumscore=${minimumscore}`;
  if (professionalschool) finalUrl += `&professionalschool=${professionalschool}`;
  if (sortby) finalUrl += `&sortby=${sortby}`;
  if (sortorder) finalUrl += `&sortorder=${sortorder}`;
  let response;
  try {
    response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(`[getApplicants] Error(NETWORK_ERROR):`, e);
    return { err: { type: "NETWORK_ERROR" }, success: false };
  }
  let rawData;
  try {
    rawData = await response.json();
  } catch (e) {
    console.log(`[getApplicants] Error(NOT_VALID_JSON):`, e);
    return { err: { type: "NOT_VALID_JSON" }, success: false };
  }
  return {
    success: true,
    ok: {
      ...rawData,
      data: rawData.data.map((applicant: ResponseApplicant) => applicantAdapter(applicant))
    },
  };
}