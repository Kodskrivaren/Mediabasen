import { useEffect } from "react";
import productService from "../services/productService";

export default function useFastSearchHook(searchQuery, setResult) {
  useEffect(() => {
    if (searchQuery === "") return setResult(undefined);

    async function searchProducts(query) {
      const data = await productService.searchProducts(query);

      if (data) {
        setResult(data.products);
      }
    }

    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);
}
