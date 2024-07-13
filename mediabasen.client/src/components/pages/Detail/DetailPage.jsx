import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../services/productService";
import LoadSpinner from "../../globals/LoadSpinner";
import ProductDetails from "./ProductDetails";

export default function DetailPage() {
  const [product, setProduct] = useState();
  const params = useParams();

  useEffect(() => {
    async function getProduct() {
      const data = await productService.getProductById(params["*"]);

      setProduct(data);
    }

    getProduct();
  }, []);

  return product ? (
    <>
      <ProductDetails product={product} />
    </>
  ) : (
    <div className="flex p-3 justify-center">
      <LoadSpinner className="mt-8" />
    </div>
  );
}
