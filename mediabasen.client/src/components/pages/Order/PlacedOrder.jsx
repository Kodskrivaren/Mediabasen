import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LoadSpinner from "../../globals/LoadSpinner";
import orderService from "../../../services/orderService";
import OrderInfo from "./OrderInfo";

export default function PlacedOrder() {
  const [params, setParams] = useSearchParams();
  const [order, setOrder] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  useEffect(() => {
    async function getAndSetOrder(orderId) {
      const order = await orderService.getOrderById(orderId);

      if (order) {
        setOrder(order);
      } else {
        navigate("/");
      }
    }
    if (state == null) {
      const orderId = params.get("orderId");

      console.log(orderId);
      if (orderId) {
        getAndSetOrder(orderId);
      } else {
        navigate("/");
      }
    } else {
      setOrder(state);
    }
  }, [state]);

  return (
    <section className="text-white flex flex-col gap-y-2 p-3 max-w-2xl mx-auto">
      {order == undefined ? (
        <LoadSpinner className={"mx-auto mt-3"} />
      ) : (
        <OrderInfo {...{ order }} />
      )}
    </section>
  );
}
