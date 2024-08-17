import React, { useContext } from "react";
import Button from "./Button";
import cartService from "../../services/cartService";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import NotifyContext from "../../contexts/NotifyContext";

export default function AddToCartBtn({ product }) {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { setNote } = useContext(NotifyContext);

  const navigate = useNavigate();

  async function onAddClick() {
    if (!user) return navigate("/login");

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
      disabled={product.stockQuantity === 0}>
      {getButtonText()}
    </Button>
  );
}
