import fetchHelper from "../utils/fetchHelper";

async function getCart() {
  const response = await fetchHelper("/Cart/GetCartForUser", "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

async function getCartProducts() {
  const response = await fetchHelper("/Cart/GetCartProductsForUser", "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

async function removeProduct(cartProductId) {
  const response = await fetchHelper(
    `/Cart/RemoveProductFromCart?cartProductId=${cartProductId}`,
    "DELETE"
  );

  if (response.status < 400) {
    try {
      return await response.json();
    } catch {}
  }
}

async function increaseProductCount(productId) {
  const response = await fetchHelper(
    "/Cart/IncreaseProductCount?productId=" + productId,
    "POST"
  );

  if (response.status < 400) {
    return await response.json();
  }
}

async function decreaseProductCount(productId) {
  const response = await fetchHelper(
    "/Cart/DecreaseProductCount?productId=" + productId,
    "POST"
  );

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

export default {
  getCart,
  getCartProducts,
  removeProduct,
  increaseProductCount,
  decreaseProductCount,
  addProductToCart,
};
