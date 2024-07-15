import fetchHelper from "../utils/fetchHelper";

async function getOrders() {
  const response = await fetchHelper("/Order/GetOrders");

  if (response.status < 400) {
    return await response.json();
  }
}

async function placeOrder() {
  const response = await fetchHelper("/Order/PlaceOrder", "POST");

  if (response.status < 400) {
    return await response.json();
  }
}

export default { getOrders, placeOrder };
