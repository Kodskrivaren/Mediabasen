import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlacedOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  if (!state) {
    navigate("/");
  }

  return (
    <section className="text-white flex flex-col gap-y-2 p-3 max-w-2xl mx-auto">
      <h2 className="text-xl text-center font-bold">Tack för din order!</h2>
      <section className="flex flex-col gap-y-2">
        <h3 className="text-lg font-semibold">Orderinformation</h3>
        <p>Ordernummer: {state.id}</p>
        <p>Produkter:</p>
        <ul className="p-3 w-fit flex flex-col gap-y-3 bg-dark rounded">
          {state.orderItems.map((item) => (
            <li key={`order-item-${item.id}`}>
              <p>{item.product.name}</p>
              <p>Antal: {item.amount}</p>
              <p>
                Styckpris: {item.price}
                {" kr"}
              </p>
            </li>
          ))}
        </ul>
        <p>Totalpris: {state.totalPrice}</p>
        <p>Status: Behandlas</p>
      </section>
      <p>Du kan hitta alla dina ordrar i din profil när du loggat in.</p>
    </section>
  );
}
