import React from "react";
import Button from "./Button";

export default function AddToCartBtn({ product }) {
  return (
    <Button classNameColor="bg-accent" className="font-bold flex-grow w-full">
      Lägg i Varukorg
    </Button>
  );
}
