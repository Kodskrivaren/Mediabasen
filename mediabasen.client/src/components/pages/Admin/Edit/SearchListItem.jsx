import React from "react";
import { Link } from "react-router-dom";
import typeHelper from "../../../../utils/typeHelper";
import Image from "../../../../assets/icons/no-image-outline.svg?react";

export default function SearchListItem({ product }) {
  const imageUrl =
    product.images.length > 0 ? product.images[0].imageUrl : undefined;

  return (
    <li className="relative w-card-mobile flex-shrink-0 md:w-card-tablet xl:w-card-desktop">
      <article className="bg-light text-white p-2 w-full rounded flex flex-col gap-1">
        <Link
          className="relative h-52"
          to={`/admin/edit/${product ? product.id : ""}`}>
          {imageUrl ? (
            <img src={imageUrl} className="w-full object-contain h-full" />
          ) : (
            <Image className="h-52 w-full" />
          )}
        </Link>
        <span className="text-gray-300">
          {typeHelper.getProductTypeName(product)} - {product.format.name}
        </span>
        <h3 className="font-bold">{product.name}</h3>
      </article>
    </li>
  );
}
