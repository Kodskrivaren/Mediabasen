import React, { useState } from "react";
import OrderProduct from "./OrderProduct";
import Button from "../../globals/Button";
import orderService from "../../../services/orderService";
import LoadSpinner from "../../globals/LoadSpinner";

export default function UserOrder({ order }) {
  const [extended, setExtended] = useState(false);
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
    <li className="bg-dark rounded mb-3">
      <section className="p-3" onClick={() => setExtended(!extended)}>
        <h4>{order.id}</h4>
        <div className="flex justify-between mt-3">
          <p>{new Date(order.orderPlaced).toLocaleDateString()}</p>
          <p>
            {!order.paid
              ? "Reserverad"
              : order.orderShipped
              ? "Skickad"
              : "Behandlas"}
          </p>
          <p>{order.totalPrice} kr</p>
        </div>
      </section>
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
              <Button
                classNameColor="bg-accent"
                className="mr-0 ml-auto"
                disabled={loadingPaymentUrl}
                onClick={payOrderClick}>
                {loadingPaymentUrl ? (
                  <LoadSpinner className={"w-6 h-6 mx-auto"} />
                ) : (
                  "Betala"
                )}
              </Button>
            )}
          </p>
          <p>Antal: {order.orderItems.length}</p>
          <ul>
            {order.orderItems.map((item, index) => (
              <OrderProduct
                key={`item-${item.id}`}
                {...{ order, item, index }}
              />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
