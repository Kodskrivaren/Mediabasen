import React from "react";
import Image from "../../assets/icons/no-image-outline.svg?react";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import ProductPrice from "../pages/Detail/ProductPrice";
import DiscountSticker from "../pages/Detail/DiscountSticker";
import typeHelper from "../../utils/typeHelper";

export default function ProductCard({ product }) {
  const imageUrl =
    product.images.length > 0 ? product.images[0].imageUrl : undefined;

  return (
    <article className="bg-light text-white p-2 w-full rounded flex flex-col gap-1">
      <Link
        className="relative h-52"
        to={`/detail/${product ? product.id : ""}`}>
        {imageUrl ? (
          <img src={imageUrl} className="w-full object-contain h-full" />
        ) : (
          <Image className="h-52 w-full" />
        )}
        {product.discountedPrice && (
          <DiscountSticker
            {...{
              product,
              className: "w-16 h-16 top-1 right-1",
              textSize: "2xl",
            }}
          />
        )}
      </Link>
      <span className="text-gray-300">
        {typeHelper.getProductTypeName(product)} - {product.format.name}
      </span>
      <h3 className="font-bold">{product.name}</h3>
      <p>
        <ProductPrice {...{ product, className: "" }} />
        {product.stockQuantity != 0 && product.stockQuantity <= 5 && (
          <span className="text-orange-300">
            {" "}
            - Få kvar i lager ({product.stockQuantity})
          </span>
        )}
      </p>
      <AddToCartBtn {...{ product }} />
    </article>
  );
}
