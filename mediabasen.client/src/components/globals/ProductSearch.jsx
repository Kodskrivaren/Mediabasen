import React from "react";
import Input from "./Input";
import SearchIcon from "../../assets/icons/search-outline.svg?react";
import SearchResult from "./SearchResult";
import { useNavigate, useSearchParams } from "react-router-dom";
import searchHelper from "../../utils/searchHelper";

export default function ProductSearch({
  preIdLink,
  searchQuery,
  setSearchQuery,
  result,
  inputOnKeyDown,
}) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  function onSearchClick() {
    const filter = params.get(searchHelper.searchQueries.productTypeId);
    navigate(
      `/search?${searchHelper.searchQueries.query}=${searchQuery}${
        filter ? `&${searchHelper.searchQueries.productTypeId}=${filter}` : ""
      }`
    );
  }

  return (
    <div className="relative pt-4 mb-4 w-full mx-auto max-w-xl flex justify-center">
      <Input
        {...{
          placeholder: "Sök på produkter...",
          classNames: "w-full rounded pl-14",
          state: searchQuery,
          setState: setSearchQuery,
          onKeyDown: inputOnKeyDown,
        }}
      />
      <button
        className="absolute top-1/2 mt-2 -translate-y-1/2 left-2 w-10 h-10"
        onClick={onSearchClick}>
        <SearchIcon />
      </button>
      {result && <SearchResult {...{ result, preIdLink }} />}
    </div>
  );
}
