import React from "react";

export default function ProductPrice({ product, className }) {
  function getPrice() {
    if (!product.discountedPrice) return product.price + " kr";

    return (
      <>
        <span className="text-accent">{product.discountedPrice} kr </span>
        <span className="text-gray-300 line-through">{product.price} kr</span>
      </>
    );
  }

  return (
    <span className={className !== undefined ? className : "text-xl font-bold"}>
      {getPrice()}
    </span>
  );
}
