import fetchHelper from "../utils/fetchHelper";
import orderHelper from "../utils/orderHelper";

async function getOrders(filter, page) {
  const response = await fetchHelper(
    `/Order/GetOrders?${orderHelper.orderPageQueries.page}=${page}&${orderHelper.orderPageQueries.filter}=${filter}`
  );

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

async function placeOrderAsGuest(formData) {
  const response = await fetchHelper("/Order/PlaceOrder", "POST", formData);

  if (response.status < 400) {
    return await response.json();
  }
}

async function getOrderCounts() {
  const response = await fetchHelper("/Order/GetOrderCounts", "GET");

  if (response.status < 400) {
    return await response.json();
  }
}

export default { getOrders, placeOrder, placeOrderAsGuest, getOrderCounts };
