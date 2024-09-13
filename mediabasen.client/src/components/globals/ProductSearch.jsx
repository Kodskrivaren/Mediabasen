import React, { useState } from "react";
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
  preNavigate = "/search",
}) {
  const [show, setShow] = useState(true);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  function onSearchClick() {
    const filter = params.get(searchHelper.searchQueries.productTypeId);
    navigate(
      `${preNavigate}?${searchHelper.searchQueries.query}=${searchQuery}${
        filter ? `&${searchHelper.searchQueries.productTypeId}=${filter}` : ""
      }`
    );
  }

  function onInputClick() {
    setTimeout(() => {
      setShow(true);
    }, 50);
  }

  return (
    <div className="relative pt-4 mb-4 w-full mx-auto max-w-xl flex justify-center">
      <div className="w-3/4 relative">
        <Input
          {...{
            placeholder: "Sök på produkter...",
            className: "w-full rounded pl-14",
            state: searchQuery,
            setState: setSearchQuery,
            onKeyDown: inputOnKeyDown,
            onClick: onInputClick,
          }}
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8"
          onClick={onSearchClick}>
          <SearchIcon />
        </button>
      </div>
      {result && show && <SearchResult {...{ result, preIdLink, setShow }} />}
    </div>
  );
}
