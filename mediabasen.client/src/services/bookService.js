import formatIds from "../utils/formatHelper";

async function addBook(book) {
  const queries = encodeURI(getQueries(book));

  const formData = new FormData();

  book.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Book/AddBook?${queries}`, {
    method: "POST",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

async function updateBook(book) {
  const queries = encodeURI(`Id=${book.Id}&` + getQueries(book));

  const formData = new FormData();

  book.Images.forEach((image) => {
    formData.append(`Images`, image);
  });

  const response = await fetch(`/api/Book/UpdateBook?${queries}`, {
    method: "PATCH",
    body: formData,
  });

  if (response.status < 400) {
    return await response.json();
  }
}

function getQueries(book) {
  return `Name=${book.Name}&Description=${book.Description}&Price=${
    book.Price
  }&ReleaseDate=${book.ReleaseDate}&Discount=${book.Discount}&AuthorId=${
    book.AuthorId
  }&PublisherId=${book.PublisherId}&FormatId=${book.FormatId}&${formatIds(
    book.GenreIds,
    "GenreIds"
  )}`;
}

export default { addBook, updateBook };
