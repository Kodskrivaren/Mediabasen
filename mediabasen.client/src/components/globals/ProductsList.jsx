import React, { useState, useEffect } from "react";
import ProductXScroll from "./ProductXScroll";

export default function ProductsList({ title, products }) {
  return (
    products &&
    products.length > 0 && (
      <section className="bg-middle p-3 relative">
        <h2 className="text-white pb-3 font-bold">{title}</h2>
        <ProductXScroll {...{ products }} />
      </section>
    )
  );
}
