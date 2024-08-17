import React from "react";
import ProductXScroll from "./ProductXScroll";
import LoadSpinner from "./LoadSpinner";

export default function ProductsList({ title, products }) {
  return (
    <section className="bg-middle p-3 relative before:block before:w-full before:h-1 before:mb-3 before:bg-line">
      <h2 className="text-white pb-3 font-bold ">{title}</h2>
      {products !== undefined ? (
        <ProductXScroll {...{ products }} />
      ) : (
        <LoadSpinner className={"mx-auto"} />
      )}
    </section>
  );
}
