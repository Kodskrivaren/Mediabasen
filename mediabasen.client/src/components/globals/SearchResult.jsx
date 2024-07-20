import React from "react";
import typeHelper from "../../utils/typeHelper";
import { Link } from "react-router-dom";

export default function SearchResult({ result }) {
  return (
    <ul className="absolute w-full top-full left-0 z-20 bg-white rounded">
      {result.length === 0 && (
        <li className={`py-3 px-2`}>
          <p>Vi hittade ingen produkt som matchade din sökning!</p>
        </li>
      )}
      {result.length > 0 &&
        result.map((product, index) => (
          <li key={`search-product-${index}`} className={`py-3 px-2`}>
            <Link to={`/detail/${product.id}`}>
              {typeHelper.getProductTypeName(product)} - {product.name} -{" "}
              {product.format.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
