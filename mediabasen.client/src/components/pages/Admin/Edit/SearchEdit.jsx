import React, { useState } from "react";
import ProductSearch from "../../../globals/ProductSearch";
import { useSearchParams } from "react-router-dom";
import searchHelper from "../../../../utils/searchHelper";
import useFullSearchHook from "../../../../hooks/useFullSearchHook";
import FilterOptions from "../../Search/FilterOptions";
import SearchHits from "../../../globals/SearchHits";
import SearchListItem from "./SearchListItem";

export default function SearchEdit() {
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    params.get(searchHelper.searchQueries.query) || ""
  );
  const [result, setResult] = useState();
  const [productTypes, setProductTypes] = useState();
  const [totalHits, setTotalHits] = useState(0);

  useFullSearchHook({ params, setResult, setProductTypes, setTotalHits });

  function inputOnKeyDown(e) {
    if (e.code.includes("Enter")) {
      params.set(searchHelper.searchQueries.query, searchQuery);
      setParams(params);
    }
  }

  return (
    <div>
      <h2 className="text-white">Hitta produkt</h2>
      <ProductSearch
        preIdLink={"/admin/edit/"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        preNavigate="/admin/searchedit"
        inputOnKeyDown={inputOnKeyDown}
      />
      <FilterOptions {...{ searchQuery, params, setParams, productTypes }} />
      <SearchHits {...{ totalHits, params }} />
      <ul className="flex mt-3 gap-card-mobile w-full flex-row flex-wrap md:gap-card-tablet xl:gap-x-4 gap-y-4 md:gap-y-4 xl:gap-y-4">
        {result &&
          result.length > 0 &&
          result.map((product, index) => (
            <SearchListItem key={`prod-${index}`} product={product} />
          ))}
      </ul>
    </div>
  );
}
