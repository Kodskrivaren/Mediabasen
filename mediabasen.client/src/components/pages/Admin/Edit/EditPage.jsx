import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../../../services/productService";
import typeHelper from "../../../../utils/typeHelper";
import EditGame from "./EditGame";

export default function EditPage() {
  const [product, setProduct] = useState();
  const params = useParams();

  useEffect(() => {
    async function getProductData() {
      const data = await productService.getProductById(params["*"]);

      if (data) {
        setProduct(data);
      }
    }

    if (params["*"]) {
      getProductData();
    }
  }, []);

  return (
    <section className="flex flex-col gap-y-3">
      {product && (
        <>
          {product.productType.name === typeHelper.productTypes.Game && (
            <EditGame {...{ product }} />
          )}
        </>
      )}
    </section>
  );
}
