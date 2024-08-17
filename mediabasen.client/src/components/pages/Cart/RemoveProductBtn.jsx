import React, { useState, useContext } from "react";
import Button from "../../globals/Button";
import cartService from "../../../services/cartService";
import LoadSpinner from "../../globals/LoadSpinner";
import CartContext from "../../../contexts/CartContext";

export default function RemoveProductBtn({ id }) {
  const { setCart } = useContext(CartContext);
  const [removeClickLoading, setRemoveClickLoading] = useState(false);

  async function removeProduct() {
    setRemoveClickLoading(true);
    const data = await cartService.removeProduct(id);

    setCart(data);
    setRemoveClickLoading(false);
  }

  return (
    <Button
      classNameColor="bg-red-500"
      className="mt-auto"
      disabled={removeClickLoading}
      onClick={removeProduct}>
      {removeClickLoading ? (
        <LoadSpinner className={"mx-auto w-8 h-8"} />
      ) : (
        "Ta bort"
      )}
    </Button>
  );
}
