import React, { useState, useContext } from "react";
import cartService from "../../../services/cartService";
import LoadSpinner from "../../globals/LoadSpinner";
import CartContext from "../../../contexts/CartContext";
import ButtonSecondary from "../../globals/ButtonSecondary";
import TrashCan from "../../../assets/icons/trash-can.svg?react";

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
    <ButtonSecondary
      className="mt-auto bg-middle absolute top-1 right-1 w-fit"
      disabled={removeClickLoading}
      onClick={removeProduct}>
      {removeClickLoading ? (
        <LoadSpinner className={"mx-auto w-6 h-6"} />
      ) : (
        <TrashCan className="w-6 h-6 mx-auto" />
      )}
    </ButtonSecondary>
  );
}
