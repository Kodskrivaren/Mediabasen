import React, { useState } from "react";
import ProductTypes from "./ProductTypes";
import GenreFilters from "./GenreFilters";
import searchHelper from "../../../utils/searchHelper";

export default function FilterOptions({
  searchQuery,
  params,
  setParams,
  productTypes,
}) {
  const currentProductType = params.get(
    searchHelper.searchQueries.productTypeId
  );
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(
    currentProductType ? Number(currentProductType) : 0
  );

  return (
    <div className="flex gap-3">
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
    </div>
  );
}
