import { useState, useEffect } from "react";
import CategoryPicker from "../globals/CategoryPicker";
import ProductSearch from "../globals/ProductSearch";
import ProductsList from "../globals/ProductsList";
import productService from "../../services/productService";

export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const result = await productService.getNewestProducts();

      setProducts(result.products);
    }

    fetchProducts();
  }, [setProducts]);

  return (
    <>
      <CategoryPicker />
      <ProductSearch />
      <ProductsList title={"Nya Produkter"} products={products} />
    </>
  );
}
