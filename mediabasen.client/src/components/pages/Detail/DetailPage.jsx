import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../services/productService";

export default function DetailPage() {
  const [product, setProduct] = useState();
  const params = useParams();

  useEffect(() => {
    async function getProduct() {
      const data = await productService.getProductById(params["*"]);

      console.log(data);
    }

    getProduct();
  }, []);

  return <section>{product ? <></> : <div></div>}</section>;
}
