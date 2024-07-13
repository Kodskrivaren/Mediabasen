import fetchHelper from "../utils/fetchHelper";

async function getCart() {
  const response = await fetchHelper("/Cart/GetCartForUser", "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

async function addProductToCart(productId, count) {
  const response = await fetchHelper(
    `/Cart/AddProductToCart?productId=${productId}&count=${count}`,
    "POST"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

export default { getCart, addProductToCart };
