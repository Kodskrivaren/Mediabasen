import React from "react";
import { Link } from "react-router-dom";
import typeHelper from "../../utils/typeHelper";
import searchHelper from "../../utils/searchHelper";

export default function NavLink({ productType }) {
  return (
    <li className="menu-item relative bg-light z-10 py-4 px-2 flex-shrink-0 w-28">
      <p className="flex justify-center">
        <Link
          className="block"
          to={`/search?${searchHelper.searchQueries.productTypeId}=${productType.id}`}>
          {typeHelper.getProductTypeName({ productType })}
        </Link>
      </p>
    </li>
  );
}
