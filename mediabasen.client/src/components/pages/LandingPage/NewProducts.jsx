import React, { useState, useEffect } from "react";
import ProductCard from "../../globals/ProductCard";
import movieService from "../../../services/movieService";

export default function NewProducts() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const result = await movieService.fetchNewMovies();

      setMovies(result.products);
    }

    fetchMovies();
  }, [setMovies]);

  return (
    <section className="bg-middle p-3">
      <h2 className="text-white pb-3 font-bold">Nya Produkter</h2>
      <ul className="flex gap-card w-full overflow-x-scroll flex-row">
        {movies.map((movie) => (
          <li
            key={`movie-${movie.id}`}
            className="inline-block relative w-card flex-shrink-0">
            <ProductCard product={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
}
