import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../../contexts/CartContext";
import cartService from "../../../services/cartService";
import Button from "../../globals/Button";
import ProductList from "./ProductList";
import orderService from "../../../services/orderService";

export default function CartPage() {
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

  async function placeOrderClick() {
    const data = await orderService.placeOrder();

    if (data) {
      setCart(undefined);
    }
  }

  return (
    <section className="p-3 text-white flex flex-col gap-y-3">
      <h2 className="text-3xl font-bold">Kundvagn</h2>
      <div className="flex flex-col gap-y-3 md:flex-row">
        {cart === undefined && <p>Din kundvagn är tom!</p>}
        {cart && products && (
          <>
            <ProductList {...{ products }} />
            <section className="flex flex-col gap-y-3">
              <h2 className="text-xl">Totalt: {calculateTotalPrice()} kr</h2>
              <Button
                classNameColor="bg-accent"
                className="w-fit"
                onClick={placeOrderClick}>
                Lägg Beställning
              </Button>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
