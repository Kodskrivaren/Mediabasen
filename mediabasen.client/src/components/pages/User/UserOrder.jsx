import React, { useState } from "react";
import OrderProduct from "./OrderProduct";

export default function UserOrder({ order }) {
  const [extended, setExtended] = useState(false);

  return (
    <li className="bg-dark rounded mb-3">
      <section className="p-3" onClick={() => setExtended(!extended)}>
        <h4>{order.id}</h4>
        <div className="flex justify-between mt-3">
          <p>{new Date(order.orderPlaced).toLocaleDateString()}</p>
          <p>{order.orderShipped ? "Skickad" : "Behandlas"}</p>
          <p>{order.totalPrice} kr</p>
        </div>
      </section>
      <div
        className={`grid transition-[grid-template-rows] bg-light ${
          extended ? "grid-rows-open" : "grid-rows-closed"
        }`}>
        <div className="mx-3 overflow-hidden flex flex-col gap-y-2">
          <p className="mt-3">
            Order skickad:{" "}
            {order.orderShipped
              ? new Date(order.orderShipped).toLocaleString()
              : "Ej skickad!"}
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
