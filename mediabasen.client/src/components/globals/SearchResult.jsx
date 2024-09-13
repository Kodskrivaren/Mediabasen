import React, { useEffect } from "react";
import typeHelper from "../../utils/typeHelper";
import { Link } from "react-router-dom";

export default function SearchResult({
  result,
  preIdLink = "/detail/",
  setShow,
}) {
  useEffect(() => {
    setShow(true);
    function onClick() {
      setShow(false);
    }

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [result]);

  return (
    <ul className="absolute w-3/4 top-full left-1/2 -translate-x-1/2 z-20 bg-white rounded">
      {result.length === 0 && (
        <li className={`py-3 px-2`}>
          <p>Vi hittade ingen produkt som matchade din sökning!</p>
        </li>
      )}
      {result.length > 0 &&
        result.map((product, index) => (
          <li
            key={`search-product-${index}`}
            className={`transition-[background] hover:bg-light`}>
            <Link
              to={`${preIdLink}${product.id}`}
              className="transition-[text-color] hover:text-white">
              <p className="px-3 py-2">
                {typeHelper.getProductTypeName(product)} - {product.name} -{" "}
                {product.format.name}
              </p>
            </Link>
          </li>
        ))}
    </ul>
  );
}
