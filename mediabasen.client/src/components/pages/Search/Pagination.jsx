import React from "react";
import searchHelper from "../../../utils/searchHelper";
import ButtonSecondary from "../../globals/ButtonSecondary";

export default function Pagination({ params, setParams, totalHits }) {
  function changePage(change) {
    const currentPage = searchHelper.getCurrentPage(params);
    let newPage = Math.max(currentPage + change, 1);

    params.set(searchHelper.searchQueries.page, newPage);

    setParams(params);
  }

  function isOnLastPage() {
    const page = searchHelper.getCurrentPage(params);

    return (
      totalHits +
        searchHelper.resultsPerPage -
        page * searchHelper.resultsPerPage <=
      searchHelper.resultsPerPage
    );
  }

  return (
    <div className="flex flex-row justify-center align-middle gap-x-3 pt-3">
      <ButtonSecondary
        {...{ disabled: searchHelper.getCurrentPage(params) === 1 }}
        onClick={() => changePage(-1)}>
        {"<-"}
      </ButtonSecondary>
      <p className="text-white block h-fit my-auto font-bold text-lg">
        {searchHelper.getCurrentPage(params)}
      </p>
      <ButtonSecondary
        {...{ disabled: isOnLastPage() }}
        onClick={() => changePage(1)}>
        {"->"}
      </ButtonSecondary>
    </div>
  );
}
