import React from "react";
import CartProduct from "./CartProduct";

export default function ProductList({ products }) {
  return (
    <ul className="flex flex-col gap-5 p-3 mb-3 md:flex-wrap md:items-center md:justify-center">
      {products.map(({ id, product, count }) => (
        <CartProduct key={`cart-product-${id}`} {...{ id, product, count }} />
      ))}
    </ul>
  );
}
