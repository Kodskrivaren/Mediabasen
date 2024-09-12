import React, { useState, useContext } from "react";
import Button from "../../globals/Button";
import orderService from "../../../services/orderService";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../contexts/CartContext";
import LoadSpinner from "../../globals/LoadSpinner";

export default function LoggedInUserSection({ calculateTotalPrice }) {
  const [placingOrder, setPlacingOrder] = useState(false);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function placeOrderClick() {
    setPlacingOrder(true);
    const data = await orderService.placeOrder();

    if (data) {
      setCart(undefined);
      navigate("/order", { state: data });
    }
    setPlacingOrder(false);
  }

  return (
    <section className="flex flex-col gap-y-3">
      <h2 className="text-xl">Totalt: {calculateTotalPrice()} kr</h2>
      <Button
        classNameColor="bg-accent"
        className="w-fit"
        disabled={placingOrder}
        onClick={placeOrderClick}>
        {placingOrder ? (
          <LoadSpinner className={"h-8 w-8 mx-8"} />
        ) : (
          "Lägg Beställning"
        )}
      </Button>
    </section>
  );
}
