import React from "react";
import { Link } from "react-router-dom";
import NavSubLink from "./NavSubLink";
import typeHelper from "../../utils/typeHelper";
import searchHelper from "../../utils/searchHelper";

export default function NavLink({ isMobile, productType }) {
  return (
    <li className="menu-item relative bg-light z-10 py-4 px-2 flex-shrink-0 w-28">
      <p className="flex justify-center">
        <Link
          className="block"
          to={`/search?${searchHelper.searchQueries.productTypeId}=${productType.id}`}>
          {typeHelper.getProductTypeName({ productType })}
        </Link>
        {/* <span className={`${isMobile ? "-rotate-90" : ""}`}>&#8711;</span> */}
      </p>
      {/* <ul
        className={`absolute z-100 bg-light flex justify-center flex-col align-middle ${
          isMobile ? "top-0 left-full" : "top-full left-0 right-0"
        }`}>
        <NavSubLink {...{ isMobile }} />
        <NavSubLink {...{ isMobile }} />
      </ul> */}
    </li>
  );
}
