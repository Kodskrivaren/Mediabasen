import React, { useState, useEffect } from "react";
import cartService from "../../../services/cartService";
import ProductsList from "../../globals/ProductsList";

export default function CartProductsSuggestions() {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    async function fetchSimilarProducts() {
      const data = await cartService.getProductSuggestions();

      if (data) {
        setSimilarProducts(data.similarProducts);
      }
    }

    fetchSimilarProducts();
  }, []);

  return (
    similarProducts.length > 0 && (
      <ProductsList title={"Du kanske gillar"} products={similarProducts} />
    )
  );
}
