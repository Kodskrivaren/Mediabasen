import React, { useState } from "react";
import ProductTypes from "./ProductTypes";
import GenreFilters from "./GenreFilters";

export default function FilterOptions({
  searchQuery,
  params,
  setParams,
  productTypes,
}) {
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(0);

  return (
    <>
      {productTypes && productTypes.length > 0 && (
        <>
          <ProductTypes
            {...{
              searchQuery,
              params,
              setParams,
              productTypes,
              selectedProductTypeId,
              setSelectedProductTypeId,
            }}
          />
          <GenreFilters {...{ selectedProductTypeId, params, setParams }} />
        </>
      )}
    </>
  );
}
