import React from "react";

export default function UserOrderTop({ order, extended, setExtended }) {
  return (
    <section
      className="p-3 transition-[background] cursor-pointer hover:bg-black"
      onClick={() => setExtended(!extended)}>
      <h4>{order.id}</h4>
      <div className="flex">
        <div className="flex justify-between mt-3 w-3/4">
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
        <div className="w-1/4 flex justify-center align-middle">
          <p
            className={`h-fit m-auto transition-[transform] text-2xl ${
              extended ? "-rotate-90" : "rotate-90"
            }`}>
            &#x27A4;
          </p>
        </div>
      </div>
    </section>
  );
}
