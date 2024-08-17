import React, { useEffect, useState } from "react";
import ProductTypes from "./ProductTypes";
import GenreFilters from "./GenreFilters";
import searchHelper from "../../../utils/searchHelper";

export default function FilterOptions({
  searchQuery,
  params,
  setParams,
  productTypes,
}) {
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(0);

  useEffect(() => {
    const currentProductType = params.get(
      searchHelper.searchQueries.productTypeId
    );

    if (
      currentProductType !== null &&
      Number(currentProductType) !== selectedProductTypeId
    ) {
      setSelectedProductTypeId(Number(currentProductType));
    } else {
      if (currentProductType === null && selectedProductTypeId > 0) {
        setSelectedProductTypeId(0);
      }
    }
  }, [params, setSelectedProductTypeId]);

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
