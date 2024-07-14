function getProductTypeName(product) {
  switch (product.productType.name) {
    case "Movie":
      return "Film";
    case "Music":
      return "Musik";
    case "Book":
      return "Bok";
    case "Game":
      return "Spel";
  }
}

const productTypes = {
  Movie: "Movie",
  Music: "Music",
  Book: "Book",
  Game: "Game",
};

export default { getProductTypeName, productTypes };
