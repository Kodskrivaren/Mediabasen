import React, { useState, useEffect } from "react";
import Input from "./Input";
import SearchIcon from "../../assets/icons/search-outline.svg?react";
import productService from "../../services/productService";
import SearchResult from "./SearchResult";

export default function ProductSearch({ preIdLink }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    if (searchQuery === "") return setResult(undefined);

    async function searchProducts(query) {
      const data = await productService.searchProducts(query);

      if (data) {
        setResult(data.products);
      }
    }

    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return (
    <div className="relative pt-4 mb-4 w-full mx-auto max-w-xl flex justify-center">
      <Input
        {...{
          placeholder: "Sök på produkter...",
          classNames: "w-full rounded pl-14",
          state: searchQuery,
          setState: setSearchQuery,
        }}
      />
      <SearchIcon className="absolute top-1/2 mt-2 -translate-y-1/2 left-2 w-10 h-10" />
      {result && <SearchResult {...{ result, preIdLink }} />}
    </div>
  );
}
