import React, { useState, useContext } from "react";
import orderService from "../../../services/orderService";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../contexts/CartContext";
import LoadSpinner from "../../globals/LoadSpinner";
import ButtonPrimary from "../../globals/ButtonPrimary";

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
    <section className="flex flex-col gap-y-3 flex-grow p-3 md:w-2/3 md:mx-auto">
      <h2 className="text-xl">Totalt: {calculateTotalPrice()} kr</h2>
      <ButtonPrimary
        className="w-fit"
        disabled={placingOrder}
        onClick={placeOrderClick}>
        {placingOrder ? (
          <LoadSpinner className={"h-8 w-8 mx-8"} />
        ) : (
          "Lägg Beställning"
        )}
      </ButtonPrimary>
    </section>
  );
}
