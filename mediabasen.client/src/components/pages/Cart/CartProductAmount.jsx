import React, { useState, useContext } from "react";
import Button from "../../globals/Button";
import CartContext from "../../../contexts/CartContext";
import cartService from "../../../services/cartService";
import LoadSpinner from "../../globals/LoadSpinner";

export default function CartProductAmount({ product, count }) {
  const { setCart } = useContext(CartContext);
  const [clickLoading, setClickLoading] = useState(false);

  async function addClick() {
    setClickLoading(true);
    const data = await cartService.increaseProductCount(product.id);

    if (data) {
      setCart(data);
    }

    setClickLoading(false);
  }

  async function minusClick() {
    setClickLoading(true);
    const data = await cartService.decreaseProductCount(product.id);

    if (data) {
      if (data.message) {
        setCart(undefined);
      } else {
        setCart(data);
      }
    }

    setClickLoading(false);
  }

  return (
    <p>
      <span className="inline-block my-auto">Antal: {count} </span>
      <Button
        classNameColor="bg-red-500"
        className="w-8 h-8 mx-2 font-bold"
        disabled={clickLoading}
        onClick={minusClick}>
        {clickLoading ? (
          <LoadSpinner className={"w-4 h-4"} />
        ) : (
          <p className="-mt-1">-</p>
        )}
      </Button>
      <Button
        classNameColor="bg-accent"
        className="w-8 h-8 mx-2 font-bold"
        disabled={clickLoading}
        onClick={addClick}>
        {clickLoading ? (
          <LoadSpinner className={"w-4 h-4"} />
        ) : (
          <p className="-mt-1">+</p>
        )}
      </Button>
    </p>
  );
}
