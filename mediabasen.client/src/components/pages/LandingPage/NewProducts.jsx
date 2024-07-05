import React from "react";
import ProductCard from "../../globals/ProductCard";

export default function NewProducts() {
  const liClasses = "inline-block relative w-card flex-shrink-0";

  return (
    <section className="bg-middle p-3">
      <h2 className="text-white pb-3 font-bold">Nya Produkter</h2>
      <ul className="flex gap-card w-full overflow-x-scroll flex-row">
        <li className={liClasses}>
          <ProductCard />
        </li>
        <li className={liClasses}>
          <ProductCard />
        </li>
        <li className={liClasses}>
          <ProductCard />
        </li>
      </ul>
    </section>
  );
}
