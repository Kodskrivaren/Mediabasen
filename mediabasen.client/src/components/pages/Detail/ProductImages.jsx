import React, { useRef, useState } from "react";
import ProductImagesModal from "./ProductImagesModal";
import ImageSwitch from "./ImageSwitch";
import useImageSwitchHook from "../../../hooks/useImageSwitchHook";
import useScreenXHook from "../../../hooks/useScreenXHook";

export default function ProductImages({ product }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const imageContainerRef = useRef();

  useImageSwitchHook(imageContainerRef, index);

  const screenX = useScreenXHook();

  return (
    <div className="w-full relative">
      <div className="flex overflow-hidden" ref={imageContainerRef}>
        {product.images.map((image) => (
          <img
            className="w-full flex-grow flex-shrink-0 object-contain"
            onClick={() => setFullscreen(true)}
            key={`product-image-${image.id}`}
            src={image.imageUrl}
          />
        ))}
      </div>

      {product.images.length > 1 && (
        <ImageSwitch {...{ index, setIndex, product }} />
      )}

      {fullscreen && screenX > 768 && (
        <ProductImagesModal
          initialIndex={index}
          product={product}
          setClose={setFullscreen}
        />
      )}
    </div>
  );
}
