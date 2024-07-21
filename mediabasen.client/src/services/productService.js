import fetchHelper from "../utils/fetchHelper";

async function getProductById(id) {
  const response = await fetchHelper(
    `/Product/GetProductById?productId=${id}`,
    "GET"
  );

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

async function searchProducts(query) {
  const response = await fetchHelper(
    `/Product/SearchProducts?query=${query}`,
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

export default {
  getProductById,
  getSimilarProducts,
  getNewestProducts,
  searchProducts,
};
