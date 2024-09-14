import React, { useState } from "react";
import OrderProduct from "./OrderProduct";
import orderService from "../../../services/orderService";
import LoadSpinner from "../../globals/LoadSpinner";
import ButtonPrimary from "../../globals/ButtonPrimary";

export default function UserOrderBottom({ order, extended }) {
  const [loadingPaymentUrl, setLoadingPaymentUrl] = useState(false);

  async function payOrderClick() {
    setLoadingPaymentUrl(true);
    const result = await orderService.payOrder(order.id);

    if (result) {
      window.location = result.stripeUrl;
    }
    setLoadingPaymentUrl(false);
  }

  return (
    <div
      className={`grid transition-[grid-template-rows] bg-light ${
        extended ? "grid-rows-open" : "grid-rows-closed"
      }`}>
      <div className="mx-3 overflow-hidden flex flex-col gap-y-2">
        <p className="mt-3">
          Skickad:{" "}
          {order.orderShipped
            ? new Date(order.orderShipped).toLocaleString()
            : "Ej skickad!"}
        </p>
        <p>
          Betald: {order.paid ? "Ja" : "Nej"}{" "}
          {!order.paid && (
            <ButtonPrimary
              className="mr-0 ml-auto"
              disabled={loadingPaymentUrl}
              onClick={payOrderClick}>
              {loadingPaymentUrl ? (
                <LoadSpinner className={"w-6 h-6 mx-auto"} />
              ) : (
                "Betala"
              )}
            </ButtonPrimary>
          )}
        </p>
        <p>Antal: {order.orderItems.length}</p>
        <ul>
          {order.orderItems.map((item, index) => (
            <OrderProduct key={`item-${item.id}`} {...{ order, item, index }} />
          ))}
        </ul>
      </div>
    </div>
  );
}
