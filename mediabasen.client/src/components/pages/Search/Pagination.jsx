import React from "react";
import Button from "../../globals/Button";
import searchHelper from "../../../utils/searchHelper";

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
      <Button
        {...{ disabled: searchHelper.getCurrentPage(params) === 1 }}
        onClick={() => changePage(-1)}
        className="hover:bg-accent">
        {"<-"}
      </Button>
      <p className="text-white block h-fit my-auto font-bold text-lg">
        {searchHelper.getCurrentPage(params)}
      </p>
      <Button
        {...{ disabled: isOnLastPage() }}
        onClick={() => changePage(1)}
        className="hover:bg-accent">
        {"->"}
      </Button>
    </div>
  );
}
