import React from "react";
import NoImageIcon from "../../../assets/icons/no-image-outline.svg?react";
import AddToCartBtn from "../../globals/AddToCartBtn";
import typeHelper from "../../../utils/typeHelper";
import MovieDetails from "./MovieDetails";
import MusicDetails from "./MusicDetails";
import ProductPrice from "./ProductPrice";
import DiscountSticker from "./DiscountSticker";

export default function ProductDetails({ product }) {
  function hasImages() {
    return product.images !== null && product.images.length > 0;
  }

  return (
    <section className="p-3 text-white flex gap-3 flex-col">
      <div>
        <h2 className="text-3xl inline font-bold">{product.name} </h2>
        <span className="inline text-gray-300">
          - {typeHelper.getProductTypeName(product)} -{" "}
        </span>
        <span className="inline text-gray-300">{product.format.name}</span>
      </div>
      <div className="relative w-full">
        {hasImages() ? (
          <img className="w-full" src={`${product.images[0].imageUrl}`} />
        ) : (
          <NoImageIcon />
        )}
        {product.discountedPrice && <DiscountSticker {...{ product }} />}
      </div>
      <ProductPrice {...{ product }} />
      <h3 className="text-2xl font-bold">Beskrivning</h3>
      <p className="text-xl">{product.description}</p>
      <h3 className="text-2xl font-bold">Specifikationer</h3>
      <div className="flex flex-wrap gap-y-2">
        <span className="w-1/2 text-gray-300">Format</span>
        <span className="w-1/2">{product.format.name}</span>
        <span className="w-1/2 text-gray-300">Genre</span>
        <ul className="w-1/2">
          {product.genres.map((genre) => (
            <li key={`genre-${genre.id}`}>
              <span>{genre.name}</span>
            </li>
          ))}
        </ul>
        {product.productType.name === typeHelper.productTypes.Movie && (
          <MovieDetails {...{ product }} />
        )}
        {product.productType.name === typeHelper.productTypes.Music && (
          <MusicDetails {...{ product }} />
        )}
        <span className="w-1/2 text-gray-300">Utgivet</span>
        <span className="w-1/2">
          {product.releaseDate
            ? new Date(product.releaseDate).toLocaleDateString()
            : "Okänt"}
        </span>
      </div>
      <AddToCartBtn {...{ product }} />
    </section>
  );
}
