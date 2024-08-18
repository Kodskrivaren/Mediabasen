import React from "react";
import ArrowBtn from "../../globals/ArrowBtn";

export default function ImageSwitch({ index, setIndex, product }) {
  function leftClick() {
    const newIndex = index - 1;

    if (newIndex < 0) {
      setIndex(product.images.length - 1);
    } else {
      setIndex(newIndex);
    }
  }

  function rightClick() {
    const newIndex = index + 1;

    if (newIndex >= product.images.length) {
      setIndex(0);
    } else {
      setIndex(newIndex);
    }
  }

  return (
    <>
      <ArrowBtn
        className="absolute left-1 top-1/2 -translate-y-1/2"
        onClick={leftClick}>
        <p className="block rotate-180 text-white m-auto">&#x27A4;</p>
      </ArrowBtn>
      <ArrowBtn
        className="absolute right-1 top-1/2 -translate-y-1/2"
        onClick={rightClick}>
        <p className="block text-white m-auto">&#x27A4;</p>
      </ArrowBtn>
    </>
  );
}
