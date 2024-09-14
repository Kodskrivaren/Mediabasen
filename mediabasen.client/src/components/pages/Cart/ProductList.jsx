import React from "react";
import CartProduct from "./CartProduct";

export default function ProductList({ products }) {
  return (
    <ul className="flex flex-col gap-y-5 md:w-1/2">
      {products.map(({ id, product, count }) => (
        <CartProduct key={`cart-product-${id}`} {...{ id, product, count }} />
      ))}
    </ul>
  );
}
