import React from "react";
import ProductSearch from "../../../globals/ProductSearch";

export default function SearchEdit() {
  return (
    <div>
      <h2 className="text-white">Hitta produkt</h2>
      <ProductSearch preIdLink={"/admin/edit/"} />
    </div>
  );
}
