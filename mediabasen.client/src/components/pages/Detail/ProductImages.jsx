import React, { useEffect, useRef, useState } from "react";
import ArrowBtn from "../../globals/ArrowBtn";

export default function ProductImages({ product }) {
  const [index, setIndex] = useState(0);
  const imageContainerRef = useRef();

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

  useEffect(() => {
    if (!imageContainerRef.current) return;

    imageContainerRef.current.children[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [imageContainerRef, index]);

  return (
    <div className="w-full relative">
      <div className="flex overflow-hidden" ref={imageContainerRef}>
        {product.images.map((image) => (
          <img className="w-full object-contain" src={image.imageUrl} />
        ))}
      </div>

      {product.images.length > 1 && (
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
      )}
    </div>
  );
}
