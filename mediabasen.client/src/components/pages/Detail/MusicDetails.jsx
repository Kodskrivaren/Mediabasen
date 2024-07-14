import React from "react";

export default function MusicDetails({ product }) {
  return (
    <>
      <span className="w-1/2 text-gray-300">Artist</span>
      <span className="w-1/2">{product.artist.fullname}</span>
      <span className="w-1/2 text-gray-300">Skivbolag</span>
      <span className="w-1/2">{product.label.fullname}</span>
      <span className="w-1/2 text-gray-300">Utgivare</span>
      <span className="w-1/2">{product.publisher.fullname}</span>
    </>
  );
}
