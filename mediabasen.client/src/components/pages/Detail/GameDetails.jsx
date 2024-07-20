import React from "react";

export default function GameDetails({ product }) {
  return (
    <>
      <span className="w-1/2 text-gray-300">Utvecklare</span>
      <span className="w-1/2">{product.developer.fullname}</span>
      <span className="w-1/2 text-gray-300">Utgivare</span>
      <span className="w-1/2">{product.publisher.fullname}</span>
    </>
  );
}
