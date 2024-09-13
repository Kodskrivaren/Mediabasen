import React from "react";

export default function UserOrderTop({ order, extended, setExtended }) {
  return (
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
  );
}
