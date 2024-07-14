import React from "react";
import PreviewImage from "../../../assets/icons/no-image-outline.svg?react";

export default function OrderProduct({ order, item, index }) {
  return (
    <li
      key={`item-${item.id}`}
      className={`${index === 0 ? "mt-3" : ""} ${
        index === order.orderItems.length - 1 ? "mb-3" : ""
      } flex gap-x-3`}>
      {item.product.images && item.product.images.length > 0 ? (
        <img className="w-1/3" src={item.product.images[0].imageUrl} />
      ) : (
        <PreviewImage />
      )}
      <section className="w-2/3">
        <h5 className="font-bold">{item.product.name}</h5>
        <p>Antal: {item.amount}</p>
        <p>Pris: {item.price}</p>
      </section>
    </li>
  );
}
