export async function paginate(model, options = {}) {
  const {
    page = 1,
    limit = 10,
    where = {},
    search,
    orderBy = {},
    select,
    include,
  } = options;

  const skip = (page - 1) * limit;

  let finalWhere = { ...where };
  if (search && search.fields && search.keyword) {
    finalWhere.OR = search.fields.map((field) => ({
      [field]: { contains: search.keyword, mode: "insensitive" },
    }));
  }

  const [data, total] = await Promise.all([
    model.findMany({
      skip,
      take: limit,
      where: finalWhere,
      orderBy,
      select,
      include,
    }),
    model.count({ where: finalWhere }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
