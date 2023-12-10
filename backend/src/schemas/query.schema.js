const z = require('zod');

const querySchema = z.object({
  code: z.string().length(6).optional(),
  firstname: z.string().min(3).optional(),
  lastname: z.string().min(3).optional(),
  sortby: z.enum(['firstname', 'lastname', 'score', 'merit']).optional(),
  sortorder: z.enum(['asc', 'desc']).optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  // limit: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 1 && parseInt(val, 10) <= 100).optional(),
  // page: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 1).optional(),
});

module.exports = {
  querySchema,
};