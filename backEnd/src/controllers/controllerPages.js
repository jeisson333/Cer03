const handlerFilters = ({ conditions }) => {
  let pageNumber = parseInt(conditions?.page) || 1;
  let limit = parseInt(conditions?.pageSize) || 20;
  let offset = Math.max(0, pageNumber - 1) * limit;
  return [pageNumber, limit, offset];
};

const handlerApiFormat = (data, pageNumber, count, limit) => {
  return {
    info: {
      count: count,
      currentPage: pageNumber,
      pages: Math.ceil(count / limit),
    },
    data: data,
  };
};
module.exports = {
  handlerFilters,
  handlerApiFormat,
};
