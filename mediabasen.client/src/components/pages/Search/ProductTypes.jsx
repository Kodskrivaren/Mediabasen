import React from "react";
import typeHelper from "../../../utils/typeHelper";
import searchHelper from "../../../utils/searchHelper";
import FilterSelect from "../../globals/FilterSelect";

export default function ProductTypes({
  searchQuery,
  params,
  setParams,
  productTypes,
  selectedProductTypeId,
  setSelectedProductTypeId,
}) {
  function onProductTypeClick(e) {
    const newValue = Number(e.target.value);

    if (searchQuery) {
      params.set(searchHelper.searchQueries.query, searchQuery);
    } else {
      params.delete(searchHelper.searchQueries.query);
    }

    if (newValue > 0) {
      params.set(searchHelper.searchQueries.productTypeId, newValue);
    } else {
      params.delete(searchHelper.searchQueries.productTypeId);
    }

    params.delete(searchHelper.searchQueries.genreId);

    setSelectedProductTypeId(newValue);

    setParams(params);
  }

  return (
    <FilterSelect value={selectedProductTypeId} onChange={onProductTypeClick}>
      <option value={0}>Välj typ</option>
      {productTypes.map((productType, index) => (
        <option key={`type-${index}`} value={productType.id}>
          {typeHelper.getProductTypeName({ productType })}
        </option>
      ))}
    </FilterSelect>
  );
}
