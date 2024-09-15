import React from "react";
import DiscountSticker from "../Detail/DiscountSticker";
import ImagePreview from "../../../assets/icons/no-image-outline.svg?react";
import { Link } from "react-router-dom";
import ProductPrice from "../Detail/ProductPrice";
import CartProductAmount from "./CartProductAmount";
import RemoveProductBtn from "./RemoveProductBtn";

export default function CartProduct({ id, product, count }) {
  return (
    <li
      key={`item-${product.id}`}
      className="flex gap-x-3 relative bg-dark rounded overflow-hidden md:w-2/3">
      <Link
        className="block relative w-1/3 max-w-52 flex-shrink-0 my-auto md:w-1/6"
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
      <section className="flex flex-col gap-y-1 py-3 md:flex-grow md:pr-3 md:justify-between">
        <h3 className="text-xl font-bold w-[80%]">{product.name}</h3>
        <div className="flex flex-col gap-y-1 py-3 md:flex-row md:justify-between md:items-end">
          <CartProductAmount {...{ product, count }} />
          <p>{product.format.name}</p>
          <ProductPrice {...{ product }} />
          <RemoveProductBtn {...{ id }} />
        </div>
      </section>
    </li>
  );
}
