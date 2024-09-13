import React from "react";
import Button from "../../globals/Button";
import orderService from "../../../services/orderService";

export default function OrderInfo({ order }) {
  async function payOrder() {
    const data = await orderService.payOrder(order.id);

    if (data) {
      window.location = data.stripeUrl;
    }
  }

  return (
    <>
      <h2 className="text-xl text-center font-bold">Tack för din order!</h2>
      <section className="flex flex-col gap-y-2">
        <h3 className="text-lg font-semibold">Orderinformation</h3>
        <p>Ordernummer: {order.id}</p>
        <p>Produkter:</p>
        <ul className="p-3 w-fit flex flex-col gap-y-3 bg-dark rounded">
          {order.orderItems.map((item) => (
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
        <p>Totalpris: {order.totalPrice} kr</p>
        <p>Betald: {order.paid ? "Ja" : "Nej"}</p>
        {!order.paid && (
          <Button classNameColor="bg-accent" onClick={payOrder}>
            Betala
          </Button>
        )}
        <p>Status: {!order.paid ? "Reserverad" : "Behandlas"}</p>
      </section>
      {order.userId != null && (
        <p>Du kan hitta alla dina ordrar i din profil när du loggat in.</p>
      )}
    </>
  );
}
