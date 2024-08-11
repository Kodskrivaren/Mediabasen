import React from "react";
import searchHelper from "../../utils/searchHelper";

export default function SearchHits({ totalHits, params }) {
  function getQueryValue() {
    return params.get(searchHelper.searchQueries.query) || "";
  }

  return (
    <div className="text-white my-3 flex justify-between">
      <p>
        {getQueryValue() !== "" ? `Träffar på "${getQueryValue()}"` : ""}
        {" - "}
        Totala träffar: {totalHits}
      </p>
      <p>Sida: {searchHelper.getCurrentPage(params)}</p>
    </div>
  );
}
