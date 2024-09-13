import React from "react";
import { Link } from "react-router-dom";
import typeHelper from "../../utils/typeHelper";
import searchHelper from "../../utils/searchHelper";

export default function NavLink({ productType }) {
  return (
    <li className="menu-item relative bg-light z-10 h-12 flex-shrink-0 w-28 transition-[background] hover:bg-middle">
      <Link
        className="w-full h-full flex justify-center items-center"
        to={`/search?${searchHelper.searchQueries.productTypeId}=${productType.id}`}>
        <p className="text-center">
          {typeHelper.getProductTypeName({ productType })}
        </p>
      </Link>
    </li>
  );
}
