import { useEffect } from "react";

export default function useBasicEditPropsHook({
  product,
  setImageFiles,
  setSelectedGenres,
  setName,
  setDescription,
  setPrice,
  setDiscount,
  setReleaseDate,
  setSelectedFormat,
}) {
  useEffect(() => {
    if (!product) return;

    async function fetchAndSetImageFiles() {
      const files = [];
      for (let image of product.images) {
        const url = image.imageUrl;
        const response = await fetch(url);

        const blob = await response.blob();

        const id = image.productId.toString();

        const imageFileName = url.substring(
          url.indexOf(id) + id.length + 1,
          url.length
        );

        const file = new File([blob], imageFileName);

        files.push(file);
      }

      setImageFiles(files);
    }

    setSelectedGenres(product.genres);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setDiscount(product.discount);
    setReleaseDate(product.releaseDate.split("T")[0]);
    setSelectedFormat(product.format);

    fetchAndSetImageFiles();
  }, [product]);
}
