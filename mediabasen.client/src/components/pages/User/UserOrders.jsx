import React, { useState, useEffect } from "react";
import orderService from "../../../services/orderService";
import UserOrder from "./UserOrder";

export default function UserOrders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    async function getOrders() {
      const data = await orderService.getOrders();

      setOrders(data);
    }

    getOrders();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">Dina ordrar</h2>
      {(!orders || orders.length === 0) && <p>Du har inga ordrar!</p>}
      {orders && orders.length > 0 && (
        <ul>
          {orders.map((order) => (
            <UserOrder key={`order-${order.id}`} {...{ order }} />
          ))}
        </ul>
      )}
    </>
  );
}
