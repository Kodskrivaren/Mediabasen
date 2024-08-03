import { useEffect } from "react";
import productService from "../services/productService";
import searchHelper from "../utils/searchHelper";

export default function useFullSearchHook({
  params,
  setResult,
  setProductTypes,
  setTotalHits,
}) {
  useEffect(() => {
    async function searchProducts() {
      const query = params.get(searchHelper.searchQueries.query);
      const productTypeId = params.get(
        searchHelper.searchQueries.productTypeId
      );
      const page = params.get(searchHelper.searchQueries.page);

      const result = await productService.fullSearchProducts(
        query,
        productTypeId,
        page
      );

      if (result) {
        setResult(result.products);
        setTotalHits(result.totalHits);
      }
    }

    searchProducts();
  }, [params]);

  useEffect(() => {
    async function getProductTypes() {
      const data = await productService.getProductTypes();

      setProductTypes(data);
    }

    getProductTypes();
  }, []);
}