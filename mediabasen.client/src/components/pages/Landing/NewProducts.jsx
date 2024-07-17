import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../../globals/ProductCard";
import movieService from "../../../services/movieService";
import ArrowBtn from "../../globals/ArrowBtn";

export default function NewProducts() {
  const [movies, setMovies] = useState([]);
  const containerRef = useRef();
  const [size, setSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      const result = await movieService.fetchNewMovies();

      setMovies(result.products);
    }

    fetchMovies();
  }, [setMovies]);

  function rightClick() {
    moveSlider(
      containerRef.current.scrollLeft +
        containerRef.current.scrollWidth / movies.length
    );
  }

  function moveSlider(newValue) {
    containerRef.current.scroll({
      left: newValue,
      behavior: "smooth",
    });
    setTimeout(() => {
      setSize(newValue);
    }, 15);
  }

  function leftClick() {
    moveSlider(
      containerRef.current.scrollLeft -
        containerRef.current.scrollWidth / movies.length
    );
  }

  useEffect(() => {
    if (containerRef.current) {
      setSize(containerRef.current.scrollLeft);
      setMaxSize(
        containerRef.current.scrollWidth -
          (containerRef.current.scrollWidth / movies.length) * 2
      );
    }
  }, [containerRef, movies]);

  return (
    <section className="bg-middle p-3 relative">
      <h2 className="text-white pb-3 font-bold">Nya Produkter</h2>
      <ul
        ref={containerRef}
        className="flex gap-card-mobile snap-x w-full overflow-x-hidden flex-row md:gap-card-tablet xl:gap-card-desktop">
        {movies.map((movie) => (
          <li
            key={`movie-${movie.id}`}
            className="inline-block snap-start relative w-card-mobile flex-shrink-0 md:w-card-tablet xl:w-card-desktop">
            <ProductCard product={movie} />
          </li>
        ))}
      </ul>
      <ArrowBtn
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={rightClick}
        disabled={size >= maxSize - 15}>
        <p className="block text-white m-auto">&#x27A4;</p>
      </ArrowBtn>
      <ArrowBtn
        className="absolute left-4 top-1/2 -translate-y-1/2"
        onClick={leftClick}
        disabled={size < 15}>
        <p className="block rotate-180 text-white m-auto">&#x27A4;</p>
      </ArrowBtn>
    </section>
  );
}
