import React from "react";
import Button from "../../globals/Button";
import typeHelper from "../../../utils/typeHelper";
import searchHelper from "../../../utils/searchHelper";

export default function ProductTypes({ params, setParams, productTypes }) {
  function getProductTypeId() {
    const paramsProductTypeId = params.get(
      searchHelper.searchQueries.productTypeId
    );
    return paramsProductTypeId ? Number(paramsProductTypeId) : undefined;
  }

  function onProductTypeClick(productType) {
    params.set(searchHelper.searchQueries.query, searchQuery);
    params.set(searchHelper.searchQueries.productTypeId, productType.id);

    setParams(params);
  }

  return (
    <ul className="text-white flex flex-wrap justify-center gap-x-3">
      {productTypes.map((productType, index) => (
        <li key={`type-${index}`}>
          <Button
            classNameColor={
              getProductTypeId() === productType.id ? "bg-accent" : "bg-dark"
            }
            className="hover:bg-accent"
            onClick={() => onProductTypeClick(productType)}>
            {typeHelper.getProductTypeName({ productType })}
          </Button>
        </li>
      ))}
    </ul>
  );
}
