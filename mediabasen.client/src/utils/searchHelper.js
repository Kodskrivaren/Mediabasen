const searchQueries = {
  query: "query",
  productTypeId: "productTypeId",
  page: "page",
  genreId: "genreId",
};

function getCurrentPage(params) {
  const queryPage = params.get(searchQueries.page);
  return queryPage ? Number(queryPage) : 1;
}

export default { searchQueries, getCurrentPage };
