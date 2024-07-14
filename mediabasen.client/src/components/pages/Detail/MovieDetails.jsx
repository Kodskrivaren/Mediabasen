import React from "react";

export default function MovieDetails({ product }) {
  return (
    <>
      <span className="w-1/2 text-gray-300">Regissör</span>
      <span className="w-1/2">{product.director.fullname}</span>
      <span className="w-1/2 text-gray-300">Skådespelare</span>
      <ul className="w-1/2">
        {product.actors.map((actor) => (
          <li key={`actor-${actor.id}`}>
            <span>{actor.fullname}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
