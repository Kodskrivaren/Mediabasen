import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import ArrowBtn from "./ArrowBtn";

export default function ProductXScroll({ products }) {
  const containerRef = useRef();
  const [size, setSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);

  function moveSlider(newValue) {
    containerRef.current.scroll({
      left: newValue,
      behavior: "smooth",
    });
    setTimeout(() => {
      setSize(newValue);
    }, 15);
  }

  function rightClick() {
    moveSlider(
      containerRef.current.scrollLeft +
        containerRef.current.scrollWidth / products.length
    );
  }

  function leftClick() {
    moveSlider(
      containerRef.current.scrollLeft -
        containerRef.current.scrollWidth / products.length
    );
  }

  useEffect(() => {
    if (containerRef.current) {
      setSize(containerRef.current.scrollLeft);
      setMaxSize(
        containerRef.current.scrollWidth -
          (containerRef.current.scrollWidth / products.length) * 2
      );
    }
  }, [containerRef, products]);

  return (
    <>
      <ul
        ref={containerRef}
        className="flex gap-card-mobile snap-x w-full overflow-x-hidden flex-row md:gap-card-tablet xl:gap-card-desktop">
        {products.map((product) => (
          <li
            key={`movie-${product.id}`}
            className="inline-block snap-start relative w-card-mobile flex-shrink-0 md:w-card-tablet xl:w-card-desktop">
            <ProductCard product={product} />
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
    </>
  );
}
