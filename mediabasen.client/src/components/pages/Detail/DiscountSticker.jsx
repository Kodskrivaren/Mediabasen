import React from "react";

export default function DiscountSticker({ product, className, textSize }) {
  return (
    <div
      className={`absolute bg-accent rounded-full flex justify-center align-middle ${
        className !== undefined ? className : "top-5 right-5 w-24 h-24"
      }`}>
      <p className={`block m-auto text-${textSize || "3xl"}`}>
        {product.discount}%
      </p>
    </div>
  );
}
