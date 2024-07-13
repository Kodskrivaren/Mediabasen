function getProductTypeName(product) {
  switch (product.productType.name) {
    case "Movie":
      return "Film";
    case "CD":
      return "CD";
    case "Book":
      return "Bok";
    case "Game":
      return "Spel";
  }
}

export default { getProductTypeName };
