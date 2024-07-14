import React, { useState } from "react";
import OrderProduct from "./OrderProduct";

export default function UserOrder({ order }) {
  const [extended, setExtended] = useState(false);

  return (
    <li className="bg-dark rounded">
      <section className="p-3 bg-black" onClick={() => setExtended(!extended)}>
        <h4>Order: {order.id}</h4>
        <p>Order lagd: {new Date(order.orderPlaced).toLocaleString()}</p>
        <p>
          Order skickad:{" "}
          {order.orderShipped
            ? new Date(order.orderShipped).toLocaleString()
            : "Ej skickad!"}
        </p>
        <p>Antal: {order.orderItems.length}</p>
      </section>
      <div
        className={`grid transition-[grid-template-rows] ${
          extended ? "grid-rows-open" : "grid-rows-closed"
        }`}>
        <ul className="mx-3 overflow-hidden flex flex-col gap-y-2">
          {order.orderItems.map((item, index) => (
            <OrderProduct key={`item-${item.id}`} {...{ order, item, index }} />
          ))}
        </ul>
      </div>
    </li>
  );
}
