import React, { useState } from "react";
import Modal from "../../globals/Modal";
import ImageSwitch from "./ImageSwitch";

export default function ProductImagesModal({
  initialIndex,
  product,
  setClose,
}) {
  const [index, setIndex] = useState(initialIndex);

  return (
    <Modal
      className="w-full relative max-h-imageFullScreen h-imageFullScreen"
      maxWidth="max-w-3xl"
      {...{ setClose, closeValue: false }}>
      <h3 className="text-2xl font-bold -mt-5">Bilder</h3>
      <div className="w-full max-h-imageFullScreen flex-grow flex-shrink-0">
        <img
          className="w-full h-full object-contain"
          src={product.images[index].imageUrl}
        />
      </div>
      <ImageSwitch {...{ product, index, setIndex }} />
    </Modal>
  );
}
