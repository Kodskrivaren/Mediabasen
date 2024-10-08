import { useState, useEffect } from "react";
import ProductSearch from "../globals/ProductSearch";
import ProductsList from "../globals/ProductsList";
import productService from "../../services/productService";
import useFastSearchHook from "../../hooks/useFastSearchHook";
import { useNavigate } from "react-router-dom";
import searchHelper from "../../utils/searchHelper";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const [productsOnSale, setProductsOnSale] = useState(undefined);
  const navigate = useNavigate();

  useFastSearchHook(searchQuery, setResult);

  function onInputKeyDown(e) {
    if (e.code.includes("Enter")) {
      navigate(`/search?${searchHelper.searchQueries.query}=${searchQuery}`);
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      const result = await productService.getNewestProducts();

      setProducts(result.products);
    }

    async function fetchProductsOnSale() {
      const result = await productService.productsOnSale();

      setProductsOnSale(result.products);
    }

    fetchProducts();
    fetchProductsOnSale();
  }, [setProducts]);

  return (
    <>
      <ProductSearch
        {...{
          searchQuery,
          setSearchQuery,
          result,
          inputOnKeyDown: onInputKeyDown,
        }}
      />
      <ProductsList title={"Nya Produkter"} products={products} />
      <ProductsList title={"Rea"} products={productsOnSale} />
    </>
  );
}
