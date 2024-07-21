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

  return (
    <Button
      classNameColor={"bg-accent"}
      onClick={onAddClick}
      className="font-bold flex-grow w-full max-w-48 max-h-12">
      {cart &&
      cart.cartProducts &&
      cart.cartProducts.find((u) => u.productId === product.id)
        ? "Redan i varukorgen"
        : "Lägg i Varukorg"}
    </Button>
  );
}
