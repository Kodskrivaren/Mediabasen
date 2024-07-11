import React from "react";
import Image from "../../assets/icons/no-image-outline.svg?react";
import Button from "./Button";

export default function ProductCard({ product }) {
  const imageUrl =
    product.images.length > 0 ? product.images[0].imageUrl : undefined;

  return (
    <article className="bg-light text-white p-2 w-full rounded flex flex-col gap-1">
      {imageUrl ? (
        <img src={imageUrl} className="w-full object-contain h-52" />
      ) : (
        <Image className="h-52 w-full" />
      )}
      <span className="text-gray-300">{product.format.name}</span>
      <h3 className="font-bold">{product.name}</h3>
      <p className="pr-2">{product.price} kr</p>
      <Button classNameColor="bg-accent" className="font-bold flex-grow w-full">
        Lägg i Varukorg
      </Button>
    </article>
  );
}
