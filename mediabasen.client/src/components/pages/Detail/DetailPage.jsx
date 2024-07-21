import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../services/productService";
import LoadSpinner from "../../globals/LoadSpinner";
import ProductDetails from "./ProductDetails";
import ProductsList from "../../globals/ProductsList";

export default function DetailPage() {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [product, setProduct] = useState();
  const params = useParams();

  useEffect(() => {
    async function getProduct() {
      const data = await productService.getProductById(params["*"]);

      setProduct(data);
    }
    async function fetchProducts() {
      const result = await productService.getSimilarProducts(params["*"]);

      setSimilarProducts(result.products);
    }

    fetchProducts();
    getProduct();
  }, [params]);

  return product ? (
    <>
      <ProductDetails product={product} />
      <ProductsList title={"Du kanske gillar"} products={similarProducts} />
    </>
  ) : (
    <div className="flex p-3 justify-center">
      <LoadSpinner className="mt-8" />
    </div>
  );
}
