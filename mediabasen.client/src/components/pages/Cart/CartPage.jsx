import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../../contexts/CartContext";
import cartService from "../../../services/cartService";
import Button from "../../globals/Button";
import ProductList from "./ProductList";
import orderService from "../../../services/orderService";
import LoadSpinner from "../../globals/LoadSpinner";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState();
  const [placingOrder, setPlacingOrder] = useState(false);

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
    setPlacingOrder(true);
    const data = await orderService.placeOrder();

    if (data) {
      setCart(undefined);
    }
    setPlacingOrder(false);
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
          </>
        )}
      </div>
    </section>
  );
}
