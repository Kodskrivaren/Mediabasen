import React from "react";

export default function BookDetails({ product }) {
  return (
    <>
      <span className="w-1/2 text-gray-300">Författare</span>
      <span className="w-1/2">{product.author.fullname}</span>
      <span className="w-1/2 text-gray-300">Utgivare</span>
      <span className="w-1/2">{product.publisher.fullname}</span>
    </>
  );
}
