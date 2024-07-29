import React from "react";
import Button from "../../globals/Button";
import searchHelper from "../../../utils/searchHelper";

export default function Pagination({ getCurrentPage, params, setParams }) {
  function changePage(change) {
    const currentPage = getCurrentPage();
    let newPage = Math.max(currentPage + change, 1);

    params.set(searchHelper.searchQueries.page, newPage);

    setParams(params);
  }

  return (
    <div className="flex flex-row justify-center align-middle gap-x-3 pt-3">
      <Button
        {...{ disabled: getCurrentPage() === 1 }}
        onClick={() => changePage(-1)}
        className="hover:bg-accent">
        {"<-"}
      </Button>
      <p className="text-white block h-fit my-auto font-bold text-lg">
        {getCurrentPage()}
      </p>
      <Button onClick={() => changePage(1)} className="hover:bg-accent">
        {"->"}
      </Button>
    </div>
  );
}
