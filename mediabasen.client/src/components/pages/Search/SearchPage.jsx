import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchHelper from "../../../utils/searchHelper";
import ProductSearch from "../../globals/ProductSearch";
import ProductCard from "../../globals/ProductCard";
import Pagination from "./Pagination";
import useFullSearchHook from "../../../hooks/useFullSearchHook";
import FilterOptions from "./FilterOptions";
import SearchHits from "../../globals/SearchHits";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [result, setResult] = useState();
  const [totalHits, setTotalHits] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    params.get(searchHelper.searchQueries.query) || ""
  );
  const [productTypes, setProductTypes] = useState();

  useFullSearchHook({ params, setResult, setProductTypes, setTotalHits });

  function inputOnKeyDown(e) {
    if (e.code.includes("Enter")) {
      params.set(searchHelper.searchQueries.query, searchQuery);
      setParams(params);
    }
  }

  return (
    <section className="p-3">
      <h2 className="text-white">Sök produkter</h2>
      <ProductSearch {...{ searchQuery, setSearchQuery, inputOnKeyDown }} />
      <FilterOptions {...{ searchQuery, params, setParams, productTypes }} />
      <SearchHits {...{ totalHits, params }} />
      <ul className="flex mt-3 gap-card-mobile w-full flex-row flex-wrap md:gap-card-tablet xl:gap-x-4 gap-y-4 md:gap-y-4 xl:gap-y-4">
        {result &&
          result.length > 0 &&
          result.map((prod, index) => (
            <li
              key={`prod-${index}`}
              className="relative w-card-mobile flex-shrink-0 md:w-card-tablet xl:w-card-desktop">
              <ProductCard key={`prod-${index}`} product={prod} />
            </li>
          ))}
      </ul>
      <Pagination {...{ params, setParams, totalHits }} />
    </section>
  );
}
