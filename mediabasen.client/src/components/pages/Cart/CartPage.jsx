import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../../contexts/CartContext";
import UserContext from "../../../contexts/UserContext";
import cartService from "../../../services/cartService";
import ProductList from "./ProductList";
import LoadSpinner from "../../globals/LoadSpinner";
import LoggedInUserSection from "./LoggedInUserSection";
import GuestForm from "./GuestForm";

export default function CartPage() {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState();

  useEffect(() => {
    async function getCartProducts() {
      const data = await cartService.getCartProducts();

      setProducts(data);
    }

    if (cart) {
      getCartProducts();
    } else {
      setCart(undefined);
      setProducts(undefined);
    }
  }, [cart]);

  function calculateTotalPrice() {
    let price = 0;

    products.forEach((cartProduct) => {
      price +=
        cartProduct.count *
        (cartProduct.product.discountedPrice
          ? cartProduct.product.discountedPrice
          : cartProduct.product.price);
    });

    return price;
  }

  return (
    <section className="p-3 text-white flex flex-col gap-y-3">
      <h2 className="text-3xl font-bold">Kundvagn</h2>
      <div className="flex flex-col gap-y-3 md:flex-row">
        {cart === undefined && <p>Din kundvagn är tom!</p>}
        {cart !== undefined && products === undefined && (
          <LoadSpinner className={"mx-auto"} />
        )}
        {cart && products && (
          <>
            <ProductList {...{ products }} />
            {user != null ? (
              <LoggedInUserSection {...{ calculateTotalPrice }} />
            ) : (
              <GuestForm {...{ calculateTotalPrice }} />
            )}
          </>
        )}
      </div>
    </section>
  );
}
