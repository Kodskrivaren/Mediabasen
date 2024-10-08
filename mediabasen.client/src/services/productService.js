import fetchHelper from "../utils/fetchHelper";
import searchHelper from "../utils/searchHelper";

async function getProductById(id) {
  const response = await fetchHelper(
    `/Product/GetProductById?productId=${id}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function getProductTypes() {
  const response = await fetchHelper(`/Product/GetProductTypes`, "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

async function getSimilarProducts(id) {
  const response = await fetchHelper(
    `/Product/GetSimilarProductsById?productId=${id}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function productsOnSale() {
  const response = await fetchHelper("/Product/ProductsOnSale", "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

async function searchProducts(query) {
  const response = await fetchHelper(
    `/Product/SearchProducts?query=${query}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function getGenresByProductTypeId(productTypeId) {
  const response = await fetchHelper(
    `/Product/GetGenresForProductType?${searchHelper.searchQueries.productTypeId}=${productTypeId}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function fullSearchProducts(query, productTypeId, page, genreId) {
  const params = [`${searchHelper.searchQueries.page}=${page || 1}`];

  if (query) {
    params.push(`${searchHelper.searchQueries.query}=${query}`);
  }

  if (productTypeId) {
    params.push(`${searchHelper.searchQueries.productTypeId}=${productTypeId}`);
  }

  if (genreId) {
    params.push(`${searchHelper.searchQueries.genreId}=${genreId}`);
  }

  const response = await fetchHelper(
    `/Product/FullSearchProducts?${params.join("&")}`,
    "GET"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function getNewestProducts() {
  const response = await fetchHelper("/Product/GetNewestProducts", "GET");

  const json = await response.json();

  return json;
}

async function postReview(review) {
  const queries = encodeURI(
    `productId=${review.ProductId}&rating=${review.Rating}&content=${review.Content}`
  );

  const response = await fetchHelper(`/Product/PostReview?${queries}`, "POST");

  if (response.status < 400) {
    return response.json();
  }
}

async function uploadProducts(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch("/api/Product/UploadProducts", {
    method: "POST",
    body: formData,
  });

  if (response.status < 400) {
    return "Success!";
  }
}

export default {
  getProductById,
  getSimilarProducts,
  productsOnSale,
  getNewestProducts,
  searchProducts,
  getGenresByProductTypeId,
  fullSearchProducts,
  postReview,
  getProductTypes,
  uploadProducts,
};
