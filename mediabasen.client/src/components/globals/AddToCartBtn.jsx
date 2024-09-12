import React, { useContext, useState } from "react";
import Button from "./Button";
import cartService from "../../services/cartService";
import CartContext from "../../contexts/CartContext";
import NotifyContext from "../../contexts/NotifyContext";
import LoadSpinner from "./LoadSpinner";

export default function AddToCartBtn({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const { setNote } = useContext(NotifyContext);
  const [loading, setLoading] = useState(false);

  async function onAddClick() {
    setLoading(true);

    let count = 1;

    if (cart) {
      const foundProduct = cart.cartProducts.find(
        (prod) => prod.productId == product.id
      );

      if (foundProduct) {
        count = foundProduct.count + 1;
      }
    }

    const newCart = await cartService.addProductToCart(product.id, count);

    setCart(newCart);

    setNote(
      <>
        <p>"{product.name}" har lagts till i varukorgen!</p>
      </>
    );

    setLoading(false);
  }

  function getButtonText() {
    if (product.stockQuantity > 0) {
      if (
        (!cart && product.stockQuantity > 0) ||
        (cart &&
          cart.cartProducts &&
          cart.cartProducts.find((u) => u.productId === product.id) ===
            undefined)
      )
        return "Lägg i varukorgen";

      if (
        cart &&
        cart.cartProducts &&
        cart.cartProducts.find((u) => u.productId === product.id)
      )
        return "I varukorgen";
    }

    return "Slut i lager";
  }

  return (
    <Button
      classNameColor={"bg-accent"}
      onClick={onAddClick}
      className="font-bold flex-grow-0 w-full max-w-48 max-h-12"
      disabled={product.stockQuantity === 0 || loading}>
      {loading ? (
        <LoadSpinner className={"mx-auto w-6 h-6"} />
      ) : (
        getButtonText()
      )}
    </Button>
  );
}
