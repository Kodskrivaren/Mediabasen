import React from "react";
import DiscountSticker from "../Detail/DiscountSticker";
import ImagePreview from "../../../assets/icons/no-image-outline.svg?react";
import { Link } from "react-router-dom";
import ProductPrice from "../Detail/ProductPrice";
import CartProductAmount from "./CartProductAmount";
import RemoveProductBtn from "./RemoveProductBtn";

export default function CartProduct({ id, product, count }) {
  return (
    <li key={`item-${product.id}`} className="flex gap-x-3">
      <Link
        className="block relative w-1/3 max-w-52 flex-shrink-0"
        to={`/detail/${product.id}`}>
        {product.images && product.images.length > 0 ? (
          <img
            className="w-full object-cover"
            src={product.images[0].imageUrl}
          />
        ) : (
          <ImagePreview className="w-full object-cover" />
        )}
        {product.discountedPrice && (
          <DiscountSticker
            {...{
              product,
              className: "top-2 right-2 w-12 h-12",
              textSize: "xl",
            }}
          />
        )}
      </Link>
      <section className="flex flex-col gap-y-1">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <CartProductAmount {...{ product, count }} />
        <p>Format: {product.format.name}</p>
        <p>
          Pris (styck): <ProductPrice {...{ product }} />
        </p>
        <RemoveProductBtn {...{ id }} />
      </section>
    </li>
  );
}
