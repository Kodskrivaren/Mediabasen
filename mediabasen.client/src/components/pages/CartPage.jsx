import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../contexts/CartContext";
import cartService from "../../services/cartService";
import ImagePreview from "../../assets/icons/no-image-outline.svg?react";
import Button from "../globals/Button";
import { Link } from "react-router-dom";

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

  async function removeProduct(cartProductId) {
    const data = await cartService.removeProduct(cartProductId);

    setCart(data);
  }

  function calculateTotalPrice() {
    let price = 0;

    products.forEach((cartProduct) => {
      price += cartProduct.count * cartProduct.product.price;
    });

    return price;
  }

  return (
    <section className="p-3 text-white flex flex-col gap-y-3">
      <h2 className="text-3xl font-bold">Kundvagn</h2>
      {cart === undefined && <p>Din kundvagn är tom!</p>}
      {cart && products && (
        <>
          <ul className="flex flex-col gap-y-5">
            {products.map(({ id, product, count }) => (
              <li key={`item-${product.id}`} className="flex gap-x-3">
                <Link
                  className="block relative w-1/3 flex-shrink-0"
                  to={`/detail/${product.id}`}>
                  {product.images && product.images.length > 0 ? (
                    <img
                      className="w-full object-cover"
                      src={product.images[0].imageUrl}
                    />
                  ) : (
                    <ImagePreview className="w-full object-cover" />
                  )}
                </Link>
                <section className="flex flex-col gap-y-1">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p>Antal: {count}</p>
                  <p>Format: {product.format.name}</p>
                  <p>Pris (styck): {product.price} kr</p>
                  <Button
                    classNameColor="bg-red-500"
                    className="mt-auto"
                    onClick={() => removeProduct(id)}>
                    Ta bort
                  </Button>
                </section>
              </li>
            ))}
          </ul>
          <h2 className="text-xl">Totalt: {calculateTotalPrice()} kr</h2>
          <Button classNameColor="bg-accent" className="w-fit">
            Lägg Beställning
          </Button>
        </>
      )}
    </section>
  );
}
